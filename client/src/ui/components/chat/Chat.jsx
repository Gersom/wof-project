import styles from './styles.module.scss';
import { useState, useEffect, useCallback } from 'react';
import {
	API_URL_CHAT_CAREGIVER,
	API_URL_CHAT_OWNER,
} from '@src/common/constants/api';
import ChatButton from '../buttons/ChatButton';
import ModalCustom from '../modals/modal-custom/ModalCustom';
import ModalChat from '../modals/modal-chat/ModalChat';
import {  getChat } from '@src/common/store/slices/chatSlice';
import { useDispatch, useSelector } from 'react-redux';

const Chat = ({ userData }) => {
	const dispatch = useDispatch();
	const [modalChats, setModalChats] = useState(false);

	const chats = useSelector((state) => state?.chatReducer?.chatsTotal);
	const chatTrigger = useSelector((state) => state?.chatReducer?.chatTrigger);

	const getChats = useCallback(async () => {
		if (userData?.role == 'owner') {
			const response = await fetch(API_URL_CHAT_OWNER + userData?.owner?.id);
			const data = await response.json();
			dispatch(getChat(data.chats));
		} else if (userData?.role == 'caregiver') {
			const response = await fetch(
				API_URL_CHAT_CAREGIVER + userData?.caregiver?.id
			);
			const data = await response.json();
			dispatch(getChat(data.chats));
		}
	}, [dispatch,userData?.role, userData?.owner?.id, userData?.caregiver?.id,]);

	//obetener todos los mensajes
	useEffect(() => {
		getChats();
	}, [getChats, chatTrigger]);

	//websocket

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
