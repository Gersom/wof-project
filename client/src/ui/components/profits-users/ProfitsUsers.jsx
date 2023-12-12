import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { API_URL_ADMIN_STATS } from "@src/common/constants/api";
import Pie from "./Pie";

const ProfitsUsers = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const response = await fetch(API_URL_ADMIN_STATS);
        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        console.log(error);
      }
    };
    getStatistics();
  }, []);

  return (
    <div className={styles.contMainProfitsUsers}>
      <div className={styles.contStatistics}>
        <h2>AÑO 2023</h2>
        <div>
          <Pie
            totalUsers={statistics?.usersCount}
            owners={statistics?.roleCounts?.owner}
            caregivers={statistics?.roleCounts?.caregiver}
          />
        </div>
      </div>
      <div className={styles.contInfo}>
        <section>
          <p>{statistics?.usersCount}</p>
          <h4>Usuarios nuevos</h4>
        </section>
        <section>
          <p>{statistics?.roleCounts?.caregiver}</p>
          <h4>Cuidadores nuevos</h4>
        </section>
        <section>
          <p>{statistics?.roleCounts?.owner}</p>
          <h4>Dueños nuevos</h4>
        </section>
        <section>
          <p>{statistics?.petsCount}</p>
          <h4>Mascotas nuevas</h4>
        </section>
      </div>
    </div>
  );
};

export default ProfitsUsers;
