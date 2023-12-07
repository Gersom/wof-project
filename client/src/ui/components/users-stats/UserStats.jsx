import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.modules.scss";
import { API_URL_ADMIN } from "@src/common/constants/api";

const UserStats = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL_ADMIN);
        console.log("API Response (Success):", response);
        setUserData(response.data);
      } catch (error) {
        console.error("API Response (Error):", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.cards}>
      <section className={styles.cardss}>
        <h4>🧑‍🎄 {userData && userData.userCount}</h4>
        <h4>
          🐶 {userData && userData.roleCounts && userData.roleCounts.owner}
        </h4>
        <h4>
          🐕 {userData && userData.roleCounts && userData.roleCounts.caregiver}
        </h4>
        <h4>🐾 {userData && userData.petsCount}</h4>
      </section>
      {userData && (
        <div>
          <p>Total de usuarios: {userData.userCount}</p>
          <p>Cantidad de propietarios: {userData.roleCounts.owner}</p>
          <p>Cantidad de cuidadores: {userData.roleCounts.caregiver}</p>
          <p>Cantidad de mascotas: {userData.petsCount}</p>
        </div>
      )}
    </div>
  );
};

export default UserStats;
