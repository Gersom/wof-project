import ChatIcon from '@icons/chatsIcon.svg?react';
import styles from './styles.module.scss';

const ChatButton = ({onClick, text}) => {


  return (
    <button className={styles.btnChat} onClick={onClick}><ChatIcon/>{text}</button>
  )
}

export default ChatButton