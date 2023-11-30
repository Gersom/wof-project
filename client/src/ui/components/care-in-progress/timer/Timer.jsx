import styles from "./styles.module.scss";
import { useTimer } from "react-timer-hook";

const Timer = ({ onExpire, expiryTimestamp }) => {
  const { days, hours, seconds, minutes } = useTimer({
    expiryTimestamp: expiryTimestamp,
    onExpire: onExpire,
  });

  return (
    <div>
      <h2
        className={styles.timer}
      >{`${days} dias - ${hours} horas - ${minutes} minutos - ${seconds} segundos`}</h2>
    </div>
  );
};

export default Timer;
