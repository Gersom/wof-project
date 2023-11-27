import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import routerNames from "@src/common/constants/routes";
import wofImage from "../../assets/images/landing/wof.svg";

const LandingPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.pol3}>
        <Link to={routerNames["login"]} className={styles.btnLog}>
          Inicia Sesión
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
        <img src={wofImage} alt="Logo" className={styles.logo} />
          <h1>Elige tu cuidador de mascotas perfecto</h1>
        </div>
      </div>
      <div>
        <p>O trabaja como cuidador profesional</p>
        <div className={styles.wrapper}></div>
        <div className={styles.btn}>
          <Link to={routerNames["register"]} className={styles.ctaButton}>
            Regístrate
          </Link>
        </div>
        <div className={styles.btn}>
          <Link to={routerNames["contact"]} className={styles.ctaButton}>
            Contáctanos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;


