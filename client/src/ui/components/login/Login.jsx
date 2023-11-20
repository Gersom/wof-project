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
          <img src={logo} alt="Logo" />
          <div>
            <h1>Iniciar Sesion</h1>
            <hr />
            <br />
          </div>

          <div>
            <form action="">
              <label htmlFor="email">
                <img src={email} alt="" /> Email:
              </label>
              <input type="text" name="email" />
              <br />
              <label htmlFor="password">
                <img src={password} alt="" /> Contraseña:
              </label>
              <input type="password" name="password" />
              <br />
              <button type="submit">Ingresar</button>
              <Link to={routerNames["formRegister"]}>
                <button>Registrarse</button>
              </Link>
            </form>
          </div>

          <br />
          <hr />
        </div>
        <div>
          <p>By Gerson</p>
        </div>
      </div>
    </>
  );
};

export default Login;
