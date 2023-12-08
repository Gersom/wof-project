import { API_URL_NOTIFICATIONS } from "@src/common/constants/api";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ModalAcceptPayed from "@components/modals/modal-accept-payed/modal-accept-payed";
import ModalReview from "../modals/modal-review/ModalReview";

const NotificationPanel = () => {
  const userData = useSelector((state) => state.userReducer.user);
  const [notifications, setNotifications] = useState([]);
  const [switchModal, setSwitchModal] = useState(false);
  const [switchModalReview, setSwitchModalReview] = useState(false);

  const handleAction = (action) => {
    switch (action) {
      case "Ver":
        setSwitchModal(true);
        break;
      case "Reseña":
        setSwitchModalReview(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    axios(`${API_URL_NOTIFICATIONS}${userData?.id}`)
      .then(({ data }) => {
        if (data) {
          // Filtrar las notificaciones solo para el usuario actual
          // const userNotifications = data.filter(
          //   (notification) => notification.userId === userData.userId
          // );
          setNotifications(data);
        } else {
          window.alert("Error al obtener la data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [userData.id]); // Asegúrate de incluir userData.id en la dependencia del useEffect

  return (
    <>
      <div className={styles.notifica}>
        <div>
          <h1 className={styles.title}>Notificaciones</h1>
        </div>
        {notifications.map((notification) => (
          <div className={styles.card} key={notification.id}>
            <div
              className={styles.notiImg}
              style={{
                backgroundImage: "url('" + userData.profilePicture + "')",
              }}
            ></div>

            <div className={styles.notiCard}>
              <p>{userData.name}</p>

              <div className={styles.notiText}>{notification.message}</div>
            </div>
            {notification.action && (
              <div
                onClick={() => handleAction(notification.action)}
                className={styles.notiButton}
              >
                {notification.action}
              </div>
            )}
          </div>
        ))}
      </div>
      {switchModal && (
        <ModalAcceptPayed closeModal={() => setSwitchModal(false)} />
      )}
      {switchModalReview && (
        <ModalReview closeModal={() => setSwitchModalReview(false)} />
      )}
    </>
  );
};

export default NotificationPanel;
