import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import routerNames from "@src/common/constants/routes";
import logo from "@icons/nav/logo.svg";
import password from "@icons/password.svg";
import email from "@icons/email.svg";
import styles from "./styles.module.scss";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import axios from "axios";

import Auth0Btutton from "../auth/auth0-button/Auth0Button";

import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@common/utils/localStorage";
import { useAuth } from "@src/context/auth-provider/authProvider";


const Login = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthenticated } = useAuth();

  useEffect(() => {
    // if (getFromLocalStorage()) {
      const { userId, token } = getFromLocalStorage("session");
      if (userId && token) {
        navigate(routerNames["loading"]);
      }
    //}
  }, []);


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

        navigate(routerNames["loading"]);
        setAuthenticated(true);
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
              <div className={styles["pasword-recovery-container"]}>
                <Link to={routerNames["register"]}>
                  Olvidaste la contraseña?
                </Link>
              </div>

              <button type="submit" className={styles["auth_btn"]}>
                Ingresar
              </button>
              <div className={styles["register-container"]}>
                <label>
                  No tienes cuenta?&nbsp;
                </label>
                <Link to={routerNames["register"]}>
                  Registrarse
                </Link>
              </div>

              <div className={styles["form_auth_hr"]}></div>
            </form>
            <Auth0Btutton type={"service"} />
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
