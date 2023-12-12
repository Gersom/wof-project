import styles from "./styles.module.scss";
import ProfitsUsers from "@src/ui/components/profits-users/ProfitsUsers";
import ProfitsMoney from "@src/ui/components/profits-money/ProfitsMoney";

const Profits = () => {
  return (
    <div className={styles.containerMainProfits}>
      <h1>Ganancias</h1>
      <div className={styles.containerMainStatistics}>
        <h3>Ganancias Dinero :</h3>
        <ProfitsMoney />
      </div>
      <div className={styles.containerMainStatistics}>
        <h3>Ganacia Usuarios :</h3>
        <ProfitsUsers />
      </div>
    </div>
  );
};

export default Profits;
