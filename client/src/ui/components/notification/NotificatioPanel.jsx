import { API_URL_NOTIFICATIONS } from "@src/common/constants/api";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const NotificationPanel = () => {
  const userData = useSelector((state) => state.userReducer.user);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios(API_URL_NOTIFICATIONS)
      .then(({ data }) => {
        if (data) {
          setNotifications(data);
        } else {
          window.alert("Error al obtener la data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <div className={styles.notifica}>
        <div>
          <h1 className={styles.title}>Notificaciones</h1>
        </div>
        {notifications.map((notification) => (
          <div className={styles.card}>
            <div
              className={styles.notiImg}
              style={{
                backgroundImage: "url('" + userData.profilePicture + "')",
              }}
            ></div>

            <div className={styles.notiCard}>
              <p>{userData.name}</p>

              <div
                className={styles.notiText}
                key={notification.id}
                value={notification.id}
              >
                {notification.message}
                {notification.action && (
                  <div onClick="" className={styles.notiButton}>
                    {notification.action}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationPanel;