import styles from "./styles.module.scss";
import { useTimer } from "react-timer-hook";

const Timer = () => {
  const { days, hours, seconds, minutes, start, pause, reset } = useTimer({
    expiryTimestamp: Date.now() + 180 * 60 * 1000,
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
