import { useState } from "react";
import styles from "./styles.module.scss";
import Timer from "./timer/Timer";

const CareInProgress = ({
  startDate = "2023-11-28T05:00:00.000Z",
  // endDate = "2023-12-10T05:00:00.000Z",
  endDate = "2023-11-30T02:00:00.000Z",
  image = "https://wof-server.up.railway.app/pictures/pet1_02.png",
}) => {
  const [isTimerExpired, setTimerExpired] = useState(false);

  const [isServiceFinished, setServiceFinished] = useState(false);

  // Manejador para finalizar el servicio
  const handleFinishService = () => {
    if (!isServiceFinished && isTimerExpired) {
      setServiceFinished(true);
      alert("¡Felicidades! Servicio Finalizado");
    }
  };
  const timerText =
    isServiceFinished || isTimerExpired
      ? "¡SERVICIO FINALIZADO CON ÉXITO😊!"
      : "TIEMPO RESTANTE PARA QUE FINALICE EL CUIDADO DE TU MASCOTA";

  return (
    <div className={styles.mainCont}>
      <div className={styles.firstCont}>
        <img src={image} className={styles.imagenCat} alt="Imagen de gato" />
      </div>
      <div className={styles.secondCont}>
        <h4 className={`${styles.care} ${styles.separator}`}>
          Cuidado en curso
        </h4>
        <span className={styles.timeText}>
          {timerText}
          <hr className={styles.sep}></hr>
        </span>

        {!isServiceFinished && !isTimerExpired && (
          <Timer
            onExpire={() => setTimerExpired(true)}
            isServiceFinished={isServiceFinished}
            expiryTimestamp={new Date(endDate)}
          />
        )}

        <div className={styles.buttonsCont}>
          <button className={styles.supportBtn}>Soporte</button>
          <button
            className={`${styles.finishBtn} ${
              !isTimerExpired || isServiceFinished ? styles.disabledBtn : ""
            }`}
            disabled={!isTimerExpired || isServiceFinished}
            onClick={handleFinishService}
          >
            Finalizar Servicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareInProgress;
