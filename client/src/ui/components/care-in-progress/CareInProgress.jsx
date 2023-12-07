import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Timer from "./timer/Timer";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@src/common/store/slices/alertSlice";
import { API_URL_POST_UPDATE_STATUS } from "@src/common/constants/api";

const CareInProgress = ({
  startDate = "2023-11-27T05:00:00.000Z",
  endDate = "2023-12-05T05:00:00.000Z",
  image = "https://wof-server.up.railway.app/pictures/pet1_02.png",
  petName = "",
  style = "",
  postId = 0,
}) => {
  const dispatch = useDispatch();
  const [isTimerExpired, setTimerExpired] = useState(false);
  const [isServiceFinished, setServiceFinished] = useState(false);
  const [isBeforeStartDate, setIsBeforeStartDate] = useState(false);
  const [isStartBtnDisabled, setStartBtnDisabled] = useState(true);
  const role = useSelector((state) => state?.userReducer?.user?.role);
  const userId = useSelector((state) => state?.userReducer?.user?.id);

  useEffect(() => {
    const currentDate = new Date();
    const startDateTime = new Date(startDate);
    // Comparar fechas y actualizar el estado.
    setIsBeforeStartDate(currentDate < startDateTime);
  }, [startDate]);

  useEffect(() => {
    // Deshabilitar el botón de "Iniciar Servicio" hasta que el temporizador llegue a cero.
    setStartBtnDisabled(isBeforeStartDate || isTimerExpired);
  }, [isBeforeStartDate, isTimerExpired]);

  const styleContainer =
    style === "small" ? styles.mainContainerSmall : styles.mainCont;

  const handleFinishService = async () => {
    if (!isServiceFinished && isTimerExpired && !isBeforeStartDate) {
      let options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (role === "owner") {
        options.body = JSON.stringify({ ownerVerified: true, userId });
        const response = await fetch(
          `${API_URL_POST_UPDATE_STATUS}${postId}`,
          options
        );
        const data = await response.json();
        if (data.doubleVerified) {
          dispatch(
            setAlert({
              message: "¡Felicidades servicio Finalizado! 😊",
              type: "success",
            })
          );
        } else {
          dispatch(
            setAlert({
              message: "¡Falta el cuidador por verificar! 😊",
              type: "warning",
            })
          );
        }
        setServiceFinished(true);
      } else if (role === "caregiver") {
        options.body = JSON.stringify({ caregiverVerified: true, userId });
        const response = await fetch(
          `${API_URL_POST_UPDATE_STATUS}${postId}`,
          options
        );
        const data = await response.json();
        if (data.doubleVerified) {
          dispatch(
            setAlert({
              message: "¡Felicidades servicio Finalizado! 😊",
              type: "success",
            })
          );
        } else {
          dispatch(
            setAlert({
              message: "¡Falta el dueño por verificar! 😊",
              type: "warning",
            })
          );
        }
        setServiceFinished(true);
      }
    }
  };
  const handleStartService = () => {
    dispatch(setAlert({ message: "Iniciando servicio", type: "success" }));
  };

  const timerText =
    isServiceFinished || isTimerExpired
      ? "¡SERVICIO FINALIZADO CON ÉXITO😊!"
      : isBeforeStartDate
      ? "RESTANTE PARA QUE INICIE EL CUIDADO DE LA MASCOTA"
      : "RESTANTE PARA QUE FINALICE EL CUIDADO DE LA MASCOTA";

  return (
    <div className={styleContainer}>
      <figure>
        <img src={image} alt="Imagen de gato" />
        <figcaption>{petName}</figcaption>
      </figure>
      <div className={styles.secondCont}>
        <h4>
          {isTimerExpired | isBeforeStartDate && "Servicio Finalizado"}
          {!isServiceFinished &&
            !isTimerExpired &&
            !isBeforeStartDate &&
            "Servicio en progreso"}
        </h4>
        <span className={styles.timeText}>
          Tiempo: <span className={styles.timeText}>{timerText}</span>
        </span>

        {!isServiceFinished && !isTimerExpired && (
          <Timer
            onExpire={() => setTimerExpired(true)}
            isServiceFinished={isServiceFinished}
            expiryTimestamp={new Date(endDate)}
            style={style}
          />
        )}

        <div className={styles.buttonsCont}>
          <button className={styles.supportBtn}>Soporte</button>
          {isBeforeStartDate ? (
            <button disabled={isStartBtnDisabled} onClick={handleStartService}>
              Iniciar Servicio
            </button>
          ) : (
            <button
              disabled={
                !isTimerExpired || isServiceFinished || isBeforeStartDate
              }
              onClick={handleFinishService}
            >
              Finalizar Servicio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareInProgress;
