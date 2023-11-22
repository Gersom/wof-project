import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React from "react";
import logo from "@images/landing/logo.svg";
import pol from "@images/landing/pol.svg";
import poligono3 from "@images/landing/poligono3.svg";
import collage from "@images/landing/collage.svg";
import routerNames from "@src/common/constants/routes";

const LandingPage = () => {
  return (
    <div>
      <div className={styles.pol3}>
        <img src={poligono3} alt="Poligono" />
        <Link to={routerNames["home"]} className={styles.btnLog}>
          Inicia Sesión
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <img className={styles.image} src={logo} alt="Logo" />
        </div>
      </div>
      <div>
        <div className={styles.wrapper}>
          <h3>
            ¡Encuentra al instante el cuidador ideal para tu amigo peludo!
          </h3>
        </div>
        <div className={styles.btn}>
          <Link to={routerNames["home"]} className={styles.ctaButton}>
            Regístrate
          </Link>
        </div>
      </div>
      <div>
        <img className={styles.collage} src={collage} alt="Collage Pets" />
      </div>
      <div className={styles.pol}>
        <img src={pol} alt="Poligono" />
      </div>
    </div>
  );
};

export default LandingPage;
