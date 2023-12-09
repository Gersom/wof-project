import { API_URL_ADMIN_INFO } from "@src/common/constants/api";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const UserInfo = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL_ADMIN_INFO);
        console.log("API Response (Success):", response);
        setUserData(response.data);
      } catch (error) {
        console.error("API Response (Error):", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {Array.isArray(userData) && userData.length > 0 ? (
        userData.map((user) => (
          <div key={user.email} className={styles.card}>
            <div
              className={styles.notiImg}
              style={{
                backgroundImage: "url('" + user.profilePicture + "')",
              }}
            ></div>
            <div>
              <p>
                {user.name} ({user.role})
              </p>
              <p>
                <span className={styles.pago}>Pago Total:</span> $
                {user.totalTransactions}
              </p>
              <p>Argentina</p>
            </div>
            <div className={styles.button}>
              <div onClick="" className={styles.notiButton1}>
                Perfil
              </div>
              <div onClick="" className={styles.notiButton2}>
                Banear
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay datos de usuario disponibles</p>
      )}
    </div>
  );
};

export default UserInfo;
