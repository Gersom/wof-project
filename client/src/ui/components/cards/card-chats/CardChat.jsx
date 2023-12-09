import ChatButton from '../../buttons/ChatButton';
import styles from './styles.module.scss';
import ModalCustom from '../../modals/modal-custom/ModalCustom';
import ModalMessages from '../../modals/modal-chat/ModalMessages';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cleanChat } from '@src/common/store/slices/chatSlice';

const CardChat = ({
	data = {
		id: 0,
		caregiverId: 0,
		ownerId: 0,
		ownerName: 'Juan',
		caregiverName: 'Pedro',
		ownerAvatar: 'https://www.abc.es/Media/201410/09/Perro--644x362.jpg',
		caregiverAvatar: 'https://www.abc.es/Media/201410/09/Perro--644x362.jpg',
		messageChats: [],
	},
	role,
}) => {
	const dispatch = useDispatch();
  const [stateModalMessages, setStateModalMessages] = useState(false);
	const type = role === 'caregiver' ? 'Dueño' : 'Cuidador';
	const imgSrc = role === 'caregiver' ? data.ownerAvatar : data.caregiverAvatar;
	const name = role === 'caregiver' ? data.ownerName : data.caregiverName;

	const notificationsState = useSelector((state) => state?.chatReducer.chats)

	const notifications = notificationsState.map((not) => {
		if(not.id == data.id){
			return not.notifications
		}
		return null
	}).filter((not) => not !== null)[0]

	useEffect(() => {
		if(stateModalMessages){
			dispatch(cleanChat({id : data.id}))
		}
	}, [stateModalMessages, data.id,dispatch, notifications])

	return (
		<>
			<div className={styles.mainContCardChat}>
				<figure>
					<img src={imgSrc} alt={name} />
					<figcaption>
						<h3>{name}</h3>
						<h4>{type}</h4>
					</figcaption>
				</figure>
				<ChatButton onClick={() => setStateModalMessages(!stateModalMessages)} text={`Chat`} notifications={notifications}/>
			</div>
			<ModalCustom state={stateModalMessages} toggleModal={() => setStateModalMessages(false)} >
				<ModalMessages data={data} imgSrc={imgSrc} type={type} onClick={() => setStateModalMessages(!stateModalMessages)} role={role}/>
			</ModalCustom>
		</>
	);
};

export default CardChat;
