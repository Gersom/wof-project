import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import { API_URL_ADMIN_STATS } from "@src/common/constants/api";

const UserStats = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL_ADMIN_STATS);
        console.log("API Response (Success):", response);
        setUserData(response.data);
      } catch (error) {
        console.error("API Response (Error):", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <span>🧑</span>
          <div className={styles.logo}>
            <h4>Usuarios</h4>
            <p> {userData && userData.usersCount}</p>
          </div>
        </div>
        <div className={styles.card}>
          <span>🐶</span>
          <div className={styles.logo}>
            <h4>Dueños</h4>
            <p>
              {userData && userData.roleCounts && userData.roleCounts.owner}
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <span>🤝</span>
          <div className={styles.logo}>
            <h4>Cuidadores</h4>
            <p>
              {userData && userData.roleCounts && userData.roleCounts.caregiver}
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <span>🦮</span>
          <div className={styles.logo}>
            <h4> Mascotas </h4>
            <p>{userData && userData.petsCount}</p>
          </div>
        </div>
      </div>
      {userData && (
        <div>
          <p>Total de usuarios: {userData.usersCount}</p>
          <p>Cantidad de dueños: {userData.roleCounts.owner}</p>
          <p>Cantidad de cuidadores: {userData.roleCounts.caregiver}</p>
          <p>Cantidad de mascotas: {userData.petsCount}</p>
        </div>
      )}
    </div>
  );
};

export default UserStats;
