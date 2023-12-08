import ChatIcon from '@icons/chatsIcon.svg?react';
import styles from './styles.module.scss';

const ChatButton = ({onClick, text, notifications}) => {

  
  return (
    <button className={styles.btnChat} onClick={onClick}><ChatIcon/>{text}{notifications > 0 && <span>{notifications}</span>}</button>
  )
}

export default ChatButton