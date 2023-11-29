import styles from "./styles.module.scss";
import Timer from "./timer/Timer";

const CareInProgress = () => {
  return (
    <div className={styles.mainCont}>
      <div className={styles.firstCont}>
        <img src="" className={styles.imagenCat} />
      </div>
      <div className={styles.secondCont}>
        <h4 className={`${styles.care} ${styles.separator}`}>
          Cuidado en curso
        </h4>
        <span className={styles.timeText}>
          TIEMPO RESTANTE PARA QUE FINALICE EL CUIDADO DE TU MASCOTA
          <hr className={styles.sep}></hr>
        </span>

        <Timer />

        <div className={styles.buttonsCont}>
          <button className={styles.supportBtn}>Soporte</button>
          <button className={styles.finishBtn}>Finalizar Servicio</button>
        </div>
      </div>
    </div>
  );
};

export default CareInProgress;
