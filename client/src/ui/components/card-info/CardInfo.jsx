import styles from './styles.module.css';

const CardInfo = () => {
  return (
    <article className={styles.article}>
        <h3>Información</h3>
        <div className={styles.info}>
            <h4>Tiempo :</h4>
            <h5>18 al 20 de noviembre</h5>
        </div>
        <div className={styles.info}>
            <h4>Raza :</h4>
            <h5>Doberman</h5>
        </div>
        <div className={styles.info}>
            <h4>Temperamento :</h4>
            <h5>tranquilo, cariñoso y sumiso</h5>
        </div>
        <div className={styles.info}>
            <h4>Modales :</h4>
            <h5>Te avisa cuando tiene hambre </h5>
        </div>
        <div className={styles.info}>
            <h4>Nota :</h4>
            <h5>Le gusta que jueguen con el a la pelota</h5>
        </div>
    </article>
  )
}

export default CardInfo