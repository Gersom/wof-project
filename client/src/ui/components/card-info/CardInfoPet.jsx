import styles from './styles.module.scss';

const CardInfoPet = ({ breed,temperaments, manners,notes}) => {
  return (
    <article className={styles.article}>
        <h3>Información</h3>
        <div className={styles.info}>
            <h4>Raza :</h4>
            <h5>{breed}</h5>
        </div>
        <div className={styles.info}>
            <h4>Temperamento :</h4>
            <h5>{temperaments}</h5>
        </div>
        <div className={styles.info}>
            <h4>Modales :</h4>
            <h5>{manners} </h5>
        </div>
        <div className={styles.info}>
            <h4>Nota :</h4>
            <h5>{notes}</h5>
        </div>
    </article>
  )
}

export default CardInfoPet;