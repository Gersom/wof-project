import styles from './styles.module.scss';

const Card = ({icon,tema,amount}) => {
  return (
  // <div className={styles.a}>
    <div className={styles.cardContent}>
      <img src={icon} alt="icon"/>
      <div>
        <div className={styles.tema}>{tema}</div>
        <div className={styles.amount}>{amount}</div>
      </div>
    </div>
  // </div>
  )
}

export default Card;