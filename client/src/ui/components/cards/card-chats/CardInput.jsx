import styles from './styles.module.scss'


 const CardInput = ({value , setValue , sendMessage}) => {
  return (
    <div className={styles.containerInput}>
      <textarea value={value} onChange={(e)=> setValue(e.target.value)} placeholder='Escribe un mensaje!'/>
      <button onClick={sendMessage}>Enviar</button>
    </div>
  )
}

export default CardInput
