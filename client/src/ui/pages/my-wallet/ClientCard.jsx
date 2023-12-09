import styles from './styles.module.scss';

const ClientCard = ({client,date,petName,petSpecie,price,imgClient}) => {
  return(
    <div className={styles.clientCardContent}>
      <img src={imgClient} alt="imgProfile" className={styles.imgClient}/>
      <div className={styles.clientData}>
        <div className={styles.clientName}>{client}</div>
        <div className={styles.clientDate}>{date}</div>
        <div className={styles.clientPet}>{`${petName} - ${petSpecie}`}</div>
      </div>
      <div className={styles.clientPrice}>{`$ ${price}`}</div>
    </div>
  )
}

export default ClientCard;