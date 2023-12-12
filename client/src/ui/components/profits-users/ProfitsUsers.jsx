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
            totalUsers={statistics?.usersTotal}
            owners={statistics?.roleCounts?.owner}
            caregivers={statistics?.roleCounts?.caregiver}
            banned={statistics?.usersBanned}
          />
        </div>
      </div>
      <div className={styles.contInfo}>
        <section>
          <h4>Usuarios nuevos</h4>
          <p>{statistics?.usersNotBanned}</p>
        </section>
        <section>
          <h4>Usuarios bloqueados</h4>
          <p>{statistics?.usersBanned}</p>
        </section>
        <section>
          <h4>Cuidadores nuevos</h4>
          <p>{statistics?.roleCounts?.caregiver}</p>
        </section>
        <section>
          <h4>Dueños nuevos</h4>
          <p>{statistics?.roleCounts?.owner}</p>
        </section>
        <section>
          <h4>Mascotas nuevas</h4>
          <p>{statistics?.petsCount}</p>
        </section>
      </div>
    </div>
  );
};

export default ProfitsUsers;
