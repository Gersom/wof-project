import styles from './styles.module.scss';
import { useLocation } from 'react-router-dom';

const CardInfoPet = ({ breed,temperaments, manners,notes,role, startDate , endDate}) => {
    const location = useLocation();
    const classRole = role === 'caregiver' ? styles.caregivers : styles.owner;
    
    const handleRenderDate = () => {
        if(location.pathname.includes('owners/offers')){
            return (
                <div>
                    <section>
                        <h4>Desde:</h4>
                    </section>
                    <section>
                        <h4>Hasta:</h4>
                    </section>
                </div>
        )
            }
    }



  return (
    <article className={`${styles.article}  ${classRole}`}>
        <h3>Información</h3>
        {handleRenderDate()}
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