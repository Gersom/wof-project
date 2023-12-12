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
  const [reviewsData, setReviewData] = useState({})

  
  const handleAction = (notification) => {
    switch (notification.action) {
      case "Ver":
        setSwitchModal(true);
        break;
      case "Reseña":
        setReviewData(notification)
        setSwitchModalReview(true);
        break;
      default:
        break;
    }
  };

  const getNotification = async () => {
    try {
      const { data } = await axios(`${API_URL_NOTIFICATIONS}${userData?.id}`);
      setNotifications(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getNotification();
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
                onClick={() => handleAction(notification)}
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
          <ModalReview reviewsData={reviewsData} closeModal={() => setSwitchModalReview(false)} setNotification={getNotification} />
        )}
    </>
  );
};

export default NotificationPanel;
