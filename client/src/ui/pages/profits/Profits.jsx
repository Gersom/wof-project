import styles from "./styles.module.scss";
import ProfitsUsers from "@src/ui/components/profits-users/ProfitsUsers";

const Profits = () => {
  return (
    <div className={styles.containerMainProfits}>
      <h1>Ganancias</h1>
      <div className={styles.containerMainStatistics}>
        <h3>Ganancias Dinero :</h3>
      </div>
      <div className={styles.containerMainStatistics}>
        <h3>Ganacia Usuarios :</h3>
        <ProfitsUsers />
      </div>
    </div>
  );
};

export default Profits;
