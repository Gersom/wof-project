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
	const { wsCaregiver } = useWsCaregiver();
	const { wsOwner } = useWsOwner();
	const [newChats, setNewChats] = useState(false);
	const [chats, setChats] = useState([]);


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
	}, [userData?.role, userData?.owner?.id, userData?.caregiver?.id,]);

	//obetener todos los mensajes
	useEffect(() => {
		getChats();
	}, [getChats, newChats]);

	//websocket

	useEffect(() => {
		if (wsOwner && userData?.role == 'owner') {
			wsOwner.onmessage = (event) => {
				const receivedMessage = JSON.parse(event.data);
				if (receivedMessage.type === 'message') {
					setChats((prev) => {
						const newChats = prev.map((chat) => {
							if (chat.id === receivedMessage.chatId) {
								chat.messageChats.push(receivedMessage);
							}
							return chat;
						});
						return newChats;
					});
					if (receivedMessage.isCaregiver) {
						dispatch(setChat({ id: receivedMessage.chatId }));
					}
				} else if (receivedMessage.type === 'update_message') {
					setNewChats(!newChats);
				}
			};
		} else if (wsCaregiver && userData?.role == 'caregiver') {
			wsCaregiver.onmessage = (event) => {
				const receivedMessage = JSON.parse(event.data);
				if (receivedMessage.type === 'message') {
					setChats((prev) => {
						const newChats = prev.map((chat) => {
							if (chat.id === receivedMessage.chatId) {
								chat.messageChats.push(receivedMessage);
							}
							return chat;
						});
						return newChats;
					});
					if (receivedMessage.isOwner) {
						dispatch(setChat({ id: receivedMessage.chatId }));
					}
				} else if (receivedMessage.type === 'update_message') {
					setNewChats(!newChats);
				}
			};
		}
	}, [wsCaregiver, wsOwner, newChats, dispatch]);

	const msgTotal = useSelector((state) => state?.chatReducer?.msgtotal);

	return (
		<>
			<div className={styles.mainContChat}>
				<div className={styles.contChat}>
					<ChatButton
						text='Chats'
						onClick={() => setModalChats(true)}
						notifications={msgTotal}
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
