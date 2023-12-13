import styles from './styles.module.scss';

const ClientCard = ({ 
  client, date, petName, petSpecie, imgClient,
  originalAmount,
  percentage,
  revenue,
  amountPaid
}) => {
  
  return (
    <div className={styles.clientCardContent}>
      <img src={imgClient} alt="imgProfile" className={styles.imgClient} />
      <div className={styles.clientData}>
        <div className={styles.clientName}>{client}</div>
        <div className={styles.clientDate}>{date}</div>
        <div className={styles.clientPet}>{`${petName} - ${petSpecie}`}</div>
      </div>

      <div className={styles.clientPrice}>
        <span> + $ {originalAmount}.00</span>
        <span style={{color:"#CE4B4B"}}>
          {`- $ ${revenue} (${percentage}%)`}
        </span>
        <span style={{color:"#1E1E1E"}}>
          {`= $ ${amountPaid}`}
        </span>
      </div>

    </div>
  )
}

export default ClientCard;