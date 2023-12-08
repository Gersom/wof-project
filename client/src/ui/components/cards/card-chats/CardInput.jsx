import styles from './styles.module.scss'


 const CardInput = ({value , setValue , sendMessage}) => {

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      sendMessage();
    }
  };

  return (
    <div className={styles.containerInput}>
      <textarea value={value} onChange={(e)=> setValue(e.target.value)} onKeyPress={handleKeyPress} placeholder='Escribe un mensaje!'/>
      <button onClick={sendMessage}>Enviar</button>
    </div>
  )
}

export default CardInput
