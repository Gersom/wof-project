import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React from "react";
import Logo from "@images/logo.png";
import routerNames from "@src/common/constants/routes";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.image} src={Logo} alt="Logo" />
        <p className={styles.subtitle}>Your reliable source for petsitters</p>
      </header>

      <section className={styles.features}>
        <div className={styles.feature}>
          <img src="src/ui/assets/images/perro1.jpg" alt="Perro 1" />
          <h2>Reliability</h2>
          <p>Our petsitters are reliable and love animals.</p>
        </div>

        <div className={styles.feature}>
          <img src="src/ui/assets/images/perro2.jpeg" alt="Perro 2" />
          <h2>Variety of Services</h2>
          <p>We offer a variety of services to meet your pet's needs.</p>
        </div>

        <div className={styles.feature}>
          <img src="src/ui/assets/images/navegar.jpg" alt="Navegar 2" />
          <h2>Fácil de usar</h2>
          <p>Navega fácilmente por nuestra app.</p>
        </div>
      </section>

      <Link to={routerNames["home"]} className={styles.ctaButton}>
        Join Now!
      </Link>
    </div>
  );
};

export default LandingPage;
