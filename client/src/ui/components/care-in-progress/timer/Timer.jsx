import styles from "./styles.module.scss";
import { useTimer } from "react-timer-hook";

const Timer = ({ onExpire, expiryTimestamp, style }) => {

  const styleTimer = style === 'small' ? styles.timerSmall : styles.timer
  const { days, hours, seconds, minutes } = useTimer({
    expiryTimestamp: expiryTimestamp,
    onExpire: onExpire,
  });

  return (
    <div className={styles.containerTimer}>
      <h2
        className={styleTimer}
      >{`${days} dias - ${hours} horas - ${minutes} minutos - ${seconds} segundos`}</h2>
    </div>
  );
};

export default Timer;
