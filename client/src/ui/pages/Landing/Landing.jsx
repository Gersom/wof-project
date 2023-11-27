import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import routerNames from "@src/common/constants/routes";

const LandingPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.pol3}>
        <Link to={routerNames["login"]} className={styles.btnLog}>
          Inicia Sesión
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.header}></div>
      </div>
      <div>
        <div className={styles.wrapper}></div>
        <div className={styles.btn}>
          <Link to={routerNames["register"]} className={styles.ctaButton}>
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
