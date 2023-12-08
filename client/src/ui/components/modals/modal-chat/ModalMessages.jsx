import styles from './styles.module.scss';
import ChatButton from '../../buttons/ChatButton';
import CardMessage from '../../cards/card-chats/CardMessage';
import { useState } from 'react';
import useWsCaregiver from '@src/common/utils/websocket/useWsCaregiver';
import useWsOwner from '@src/common/utils/websocket/useWsOwner';
import CardInput from '../../cards/card-chats/CardInput';

const ModalMessages = ({
	imgSrc,
	type,
	onClick,
	role,
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
}) => {
	const [message, setMessage] = useState({
		type: 'message',
		message: '',
		isOwner: false,
		isCaregiver: false,
		createdAt: '',
	});

	const { sendMessageOwner } = useWsOwner(role);
	const { sendMessageCaregiver } = useWsCaregiver(role);

	const handleSendMessage = async () => {
		if (role === 'owner') {
			await sendMessageOwner({
				...message,
				role: role,
				isOwner: true,
        isCaregiver: false,
				caregiverId: data.caregiverId,
				ownerId: data.ownerId,
			});
      setMessage({ ...message, message: '' });
		} else if (role === 'caregiver') {
			await sendMessageCaregiver({
				...message,
				role: role,
				isCaregiver: true,
        isOwner: false,
				caregiverId: data.caregiverId,
				ownerId: data.ownerId,
			});
      setMessage({ ...message, message: '' });
		}
	};

	return (
		<div className={styles.mainContainerChat}>
			<section className={styles.mainContainerSection}>
				<ChatButton text={'Chats'} onClick={onClick} />
				<figure>
					<img src={imgSrc} alt={name} />
					<figcaption>
						<h3>{type}</h3>
					</figcaption>
				</figure>
			</section>
			<div className={styles.mainContainerMessages}>
				{data.messageChats.map((message) => {
					return (
						<CardMessage
							key={message.id}
							data={message}
							caregiverName={data.caregiverName}
							ownerName={data.ownerName}
							role={role}
						/>
					);
				})}
			</div>
      <CardInput
        value={message.message}
        setValue={(value) => setMessage({...message, message: value})}
        sendMessage={handleSendMessage}
      />
		</div>
	);
};

export default ModalMessages;
