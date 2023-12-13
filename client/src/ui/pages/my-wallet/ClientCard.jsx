import styles from './styles.module.scss';

const ClientCard = ({ client, date, petName, petSpecie, price, imgClient }) => {
  const originalPrice = price;
  const discountPercentage = 5;
  const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
  return (
    <div className={styles.clientCardContent}>
      <img src={imgClient} alt="imgProfile" className={styles.imgClient} />
      <div className={styles.clientData}>
        <div className={styles.clientName}>{client}</div>
        <div className={styles.clientDate}>{date}</div>
        <div className={styles.clientPet}>{`${petName} - ${petSpecie}`}</div>
      </div>
      <div className={styles.clientPrice}>
        {`$ ${originalPrice} `} <span style={{color:"red"}}> - ${discountPercentage}%</span>
        <br />
        <span style={{color:"green"}}>
          {`$${discountedPrice.toFixed(2)}`}
        </span>

      </div>

    </div>
  )
}

export default ClientCard;