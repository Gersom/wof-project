import ChatButton from '../../buttons/ChatButton';
import styles from './styles.module.scss';
import ModalCustom from '../../modals/modal-custom/ModalCustom';
import ModalMessages from '../../modals/modal-chat/ModalMessages';
import { useState } from 'react';

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
  const [stateModalMessages, setStateModalMessages] = useState(false);
	const type = role === 'caregiver' ? 'Dueño' : 'Cuidador';
	const imgSrc = role === 'caregiver' ? data.ownerAvatar : data.caregiverAvatar;
	const name = role === 'caregiver' ? data.ownerName : data.caregiverName;


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
				<ChatButton onClick={() => setStateModalMessages(!stateModalMessages)} text={`Chat`} />
			</div>
			<ModalCustom state={stateModalMessages} toggleModal={() => setStateModalMessages(false)} >
				<ModalMessages data={data} imgSrc={imgSrc} type={type} onClick={() => setStateModalMessages(!stateModalMessages)} role={role}/>
			</ModalCustom>
		</>
	);
};

export default CardChat;
