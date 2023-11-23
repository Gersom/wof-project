import { Link } from "react-router-dom";
import routerNames from "@src/common/constants/routes";
import logo from "@icons/nav/logo.svg";
import password from "@icons/password.svg";
import email from "@icons/email.svg";
import styles from "./styles.module.scss";

const Login = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles["form-container"]}>
          <div className={styles["logo_container"]}>
            <img src={logo} alt="Logo" />
            <span>.com</span>
          </div>
          <div>
            <h1>Iniciar Sesion</h1>
            <div className={styles["form_auth_hr"]}></div>
          </div>

          <div className={styles["auth_form"]}>
            <form action="">
              <div className={styles["input_container"]}>
                <label htmlFor="email">
                  <div
                    className={styles["auth_form_icon"]}
                    style={{ backgroundImage: "url('" + email + "')" }}
                  ></div>
                  <span>Email:</span>
                </label>
                <input type="text" name="email" />
              </div>
              <div className={styles["input_container"]}>
                <label htmlFor="password">
                  <div
                    className={styles["auth_form_icon"]}
                    style={{ backgroundImage: "url('" + password + "')" }}
                  ></div>
                  <span>Contraseña:</span>
                </label>
                <input type="password" name="password" />
              </div>
              <button type="submit" className={styles["auth_btn"]}>
                Ingresar
              </button>
              <Link to={routerNames["register"]} className={styles["auth_btn"]}>
                Registrarse
              </Link>
            </form>
          </div>

          <div className={styles["form_auth_hr"]}></div>
        </div>
        <p className={styles["footer_credit"]}>
          <span>•</span>By Group 3<span>•</span>
        </p>
      </div>
    </>
  );
};

export default Login;
