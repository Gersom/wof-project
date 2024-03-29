import styles from './styles.module.scss'

const ModalPost = ({ message ,nameOwner }) => {
  return (
    <div className={styles.container}>
        <h1>¡Felicidades!</h1>
        <h3>Ahora estas cuidando tu primera mascota</h3>
        <section>
            <h4>El siguiente paso es comunicarte con</h4>
            <h2>{nameOwner}</h2>
            <h4>Ahora podras ver su información de contacto en la misma página</h4>
        </section>
    </div>
  )
}

export default ModalPost