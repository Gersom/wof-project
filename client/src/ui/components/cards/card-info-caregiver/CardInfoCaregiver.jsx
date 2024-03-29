import styles from './styles.module.scss';


const CardInfoCaregiver = ({
     data = { service:"Muy bueno", myHouse:"", experiencies:"No tiene", notes:"" } }, role="caregiver") => {
        const classRole = role === 'caregiver' ? styles.caregivers : styles.owner;
    return (
        <div>
      <article className={`${styles.article}  ${classRole}`}>
        <h3>Información</h3>
        <div className={styles.info}>
        </div>
        <div className={styles.info}>
          <h4>Servicio:</h4>
          <h5>{data.service}</h5>
        </div>
        <div className={styles.info}>
          <h4>Casa:</h4>
          <h5>{data.myHouse}</h5>
        </div>
        <div className={styles.info}>
          <h4>Experiencia:</h4>
          <h5>{data.experiencies}</h5>
        </div>
        <div className={styles.info}>
          <h4>Notas:</h4>
          <h5>{data.notes}</h5>
        </div>
      </article>
      </div>
      
    );
  };
  export default CardInfoCaregiver;  
    