import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import routerNames from "@src/common/constants/routes";
import wofImage from "@images/landing/wof.svg";
import rectangle from "@images/landing/rectangle.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";


const LandingPage = () => {
  const { isLoading, isAuthenticated: isAuth0enticated } = useAuth0();

  useEffect(() => {
    if (isLoading) {
      console.log("LOADING AUTH0 INFO", isLoading);
    } else if (!isLoading && isAuth0enticated) {
      console.log("LOGIN FINISH VERIFICATION AUTH0 RETURNS", isAuth0enticated);
    } else if (!isLoading && !isAuth0enticated) {
      console.log("LOGIN FINISH VERIFICATION AUTH0 RETURNS", isAuth0enticated);
    }
  }, [isLoading, isAuth0enticated]);

  return (
    <div className={styles.mainContainer}>
      <div>
        <img className={styles.imageRec} src={rectangle} alt="Rectangle" />
      </div>
      <div className={styles.cont}>
        <Link to={routerNames["contact"]} className={styles.contactBtn}>
          Contáctanos
        </Link>
        <Link to={routerNames["login"]} className={styles.loginBtn}>
          Inicia Sesión
        </Link>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Elige tu cuidador de mascotas perfecto</h1>
        <img src={wofImage} alt="Logo" className={styles.logoWof} />
        <div>
          <h1 className={styles.secTitle}>
            O trabaja como cuidador profesional
          </h1>

          <div className={styles.btn}>
            <button className={styles.registerBtn}>
              <Link to={routerNames["register"]} className={styles.textButton}>
                Regístrate
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
