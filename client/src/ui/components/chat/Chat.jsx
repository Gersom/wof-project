import React from 'react';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import {
	API_URL_CHAT_CAREGIVER,
	API_URL_CHAT_OWNER,
} from '@src/common/constants/api';
import useWsCaregiver from '@src/common/utils/websocket/useWsCaregiver';
import useWsOwner from '@src/common/utils/websocket/useWsOwner';
import { useLocation } from 'react-router-dom';

const Chat = ({ userData }) => {
  const location = useLocation();

	const [chats, setChats] = useState([
		{ id: 0, caregiverId: 0, ownerId: 0, messageChats: [] },
	]);
	const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([{message: '', isOwner: false, isCaregiver: false , createdAt: ''}]);
  const [chatActive, setChatActive] = useState(null);

	//obetener todos los mensajes
	useEffect(() => {
		const getChats = async () => {
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
		};
		getChats();
	}, [userData?.role , userData?.owner?.id, userData?.caregiver?.id]);

	const { sendMessageOwner } = useWsOwner(userData?.role);
	const { sendMessageCaregiver } = useWsCaregiver(userData?.role);
	//enviar mensaje

  const sendMessage = async (chatId) => {
    if (userData?.role === 'owner') {
      setMessages([...messages, {message: message, isOwner: true, isCaregiver: false , createdAt: '', id: chatId}])
      setMessage('')
      await sendMessageOwner({
        type: 'message',
        role : userData?.role,
        ownerId: userData?.owner?.id,
        caregiverId: chats.find((chat) => chat.id === chatId)?.caregiverId,
        message: message,
      });
    } else if (userData?.role === 'caregiver') {
      setMessages([...messages, {message: message, isOwner: false, isCaregiver: true , createdAt: ''}])
      setMessage('')
      await sendMessageCaregiver({
        type: 'message',
        role : userData?.role,
        ownerId: chats.find((chat) => chat.id === chatId)?.ownerId,
        caregiverId: userData?.caregiver?.id,
        message: message,
      });
    }
  }

  const stylesChat = (id) => {
    if(id === chatActive){
      return styles.chatActive
    }else{
      return styles.chat
    }
  }

  const handleClickOpenChat = (id) => {
    if(id == chatActive){
      setChatActive(null)
    }else {
    setChatActive(id)
    }
  }

  const renderChats = () =>{
    return chats.length > 0 && chats.map((chat) => {
      let lastsMessages = [...chat.messageChats,...messages.filter((message) => message.id === chat.id)]
      return <div key={chat.id} className={stylesChat(chat.id)} >
        <section >
        <img src={userData?.role === 'owner'? chat.caregiverAvatar : chat.ownerAvatar} onClick={() => handleClickOpenChat(chat.id)}/>
        <h3>{userData?.role === 'owner'? chat.caregiverName : chat.ownerName}</h3>
        </section>
        {lastsMessages.map((message) => {
          if(message.isOwner && userData?.role === 'owner'){
            return <p key={message.id} className={styles.msgOwnerByOwner}>{message.message}</p>
          } else if(message.isCaregiver && userData?.role === 'owner'){
            return <p key={message.id} className={styles.msgOwnerByCaregiver}>{message.message}</p>
          } else if(message.isCaregiver && userData?.role === 'caregiver'){
            return <p key={message.id} className={styles.msgCaregiverByCaregiver}>{message.message}</p>
          } else if(message.isOwner && userData?.role === 'caregiver'){
            return <p key={message.id} className={styles.msgCaregiverByOwner}>{message.message}</p>
          }
        })}
        <div className={styles.containerInput}>
          <input type="text" placeholder="Escribe un mensaje" value={message} onChange={(e) => setMessage(e.target.value)}/>
          <button onClick={() => sendMessage(chat.id)}>Enviar</button>
        </div>
      </div>
    })

  }


	return (
		<div className={styles.mainContChat}>
			<div className={styles.contChat}>
        <h1>mi chat</h1>
      {renderChats()}
			</div>
		</div>
	);
};

export default Chat;
