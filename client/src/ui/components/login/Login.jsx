import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import routerNames from "@src/common/constants/routes";
import logo from "@icons/nav/logo.svg";
import PasswordIcon from "@icons/password.svg?react";
import EmailIcon from "@icons/email.svg?react";
import styles from "./styles.module.scss";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import axios from "axios";
import { API_URL_USER } from "@common/constants/api"
import Auth0Btutton from "../auth/auth0-button/Auth0Button";

import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@common/utils/localStorage";
import { useAuth } from "@src/context/auth-provider/authProvider";

import { useDispatch } from "react-redux";
import { setAlert } from "@src/common/store/slices/alertSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthenticated } = useAuth();

  useEffect(() => {
    // if (getFromLocalStorage()) {
      const storage = getFromLocalStorage("session");
      if (storage?.userId && storage?.token) {
        navigate(routerNames["loading"]);
      }
    //}
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = e.target.elements.email.value;
    const passwordValue = e.target.elements.password.value;

    try {
      const response = await axios.post(
        API_URL_USER + "/login",
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
        dispatch(setAlert({ message: "Inicio de sesion completado", type: "success" }));
        navigate(routerNames["loading"]);
        setAuthenticated(true);
      }
    } catch (error) {
      dispatch(setAlert({ message: "Error al iniciar sesión", type: "error" }));
      
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
                <label className={styles["labelIcon"]} htmlFor="email">
                  <EmailIcon/>
                  <span>Email:</span>
                </label>
                <input type="text" name="email" />
              </div>
              <div className={styles["input_container"]}>
                <label className={styles["labelIcon"]} htmlFor="password">
                  <PasswordIcon />
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
