import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import routerNames from "@src/common/constants/routes";
import logo from "@icons/nav/logo.svg";
import password from "@icons/password.svg";
import email from "@icons/email.svg";
import styles from "./styles.module.scss";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL_LOGIN } from "@src/common/constants/api";

import axios from "axios";

import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@common/utils/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = e.target.elements.email.value;
    const passwordValue = e.target.elements.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email: emailValue,
          password: passwordValue,
        }
      );

      saveToLocalStorage("session", {
        userId: response.data.userId,
        token: response.data.token,
      });

      if (response.data.token) {
        window.alert("Inicio de sesion completado");
        navigate(routerNames["dashboard"]);
      }
    } catch (error) {
      window.alert("error en correo o contraseña");
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            <form onSubmit={handleSubmit}>
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
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <div
                  className={styles["toggle-password-icon"]}
                  onClick={handleTogglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </div>
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
