import styles from './styles.module.scss';
import { useState, useEffect, useCallback } from 'react';
import {
	API_URL_CHAT_CAREGIVER,
	API_URL_CHAT_OWNER,
} from '@src/common/constants/api';
import useWsCaregiver from '@src/common/utils/websocket/useWsCaregiver';
import useWsOwner from '@src/common/utils/websocket/useWsOwner';
import ChatButton from '../buttons/ChatButton';
import ModalCustom from '../modals/modal-custom/ModalCustom';
import ModalChat from '../modals/modal-chat/ModalChat';
import { setChat } from '@src/common/store/slices/chatSlice';
import { useDispatch, useSelector } from 'react-redux';

const Chat = ({ userData }) => {
	const dispatch = useDispatch();
	const [modalChats, setModalChats] = useState(false);
	const { wsCaregiver } = useWsCaregiver(userData?.role || null);
	const { wsOwner } = useWsOwner(userData?.role || null);
	const [newChats, setNewChats] = useState(false);
	const [chats, setChats] = useState([
		{
			id: 0,
			caregiverId: 0,
			ownerId: 0,
			messageChats: [],
			caregiverName: '',
			ownerName: '',
			caregiverAvatar: '',
			ownerAvatar: '',
		},
	]);

	const getChats = useCallback(async () => {
		if (userData?.role == 'owner') {
			const response = await fetch(API_URL_CHAT_OWNER + userData?.owner?.id);
			const data = await response.json();
			setChats(data.chats);
		} else if (userData?.role == 'caregiver') {
			const response = await fetch(
				API_URL_CHAT_CAREGIVER + userData?.caregiver?.id
			);
			const data = await response.json();
			setChats(data.chats);
		}
	}, [userData?.role, userData?.owner?.id, userData?.caregiver?.id]);

	//obetener todos los mensajes
	useEffect(() => {
		getChats();
	}, [getChats, newChats]);

	//websocket

	useEffect(() => {
		if (wsOwner) {
			wsOwner.onmessage = (event) => {
				const receivedMessage = JSON.parse(event.data);
				if (receivedMessage.type === 'message') {
					setChats((prev) => {
						const newChats = prev.map((chat) => {
							if (chat.id === receivedMessage.chatId) {
								chat.messageChats.push(receivedMessage);
								dispatch(setChat({ id: chat.id }));
							}
							return chat;
						});
						return newChats;
					});
				} else if (receivedMessage.type === 'update_message') {
					setNewChats(!newChats);
				}
			};
		} else if (wsCaregiver) {
			wsCaregiver.onmessage = (event) => {
				const receivedMessage = JSON.parse(event.data);
				if (receivedMessage.type === 'message') {
					setChats((prev) => {
						const newChats = prev.map((chat) => {
							if (chat.id === receivedMessage.chatId) {
								chat.messageChats.push(receivedMessage);
								dispatch(setChat({ id: chat.id }));
							}
							return chat;
						});
						return newChats;
					});
				} else if (receivedMessage.type === 'update_message') {
					setNewChats(!newChats);
				}
			};
		}
	}, [wsCaregiver, wsOwner]);

	const msgTotal = useSelector((state) => state.chatReducer.msgTotal);

	const isModalOpenNotification = () => {
		if (modalChats) {
			return null;
		} else {
			return msgTotal;
		}
	};

	return (
		<>
			<div className={styles.mainContChat}>
				<div className={styles.contChat}>
					<ChatButton
						text='Chats'
						onClick={() => setModalChats(true)}
					/>
				</div>
			</div>
			<ModalCustom state={modalChats} toggleModal={() => setModalChats(false)}>
				<ModalChat
					role={userData.role}
					data={chats}
					onClick={() => setModalChats(!modalChats)}
				/>
			</ModalCustom>
		</>
	);
};

export default Chat;
