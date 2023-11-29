import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import routerNames from "@src/common/constants/routes";
import logo from "@icons/nav/logo.svg";
import password from "@icons/password.svg";
import email from "@icons/email.svg";
import styles from "./styles.module.scss";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@src/context/auth-provider/authProvider";
import { useAuth0 } from "@auth0/auth0-react";


const apiUrl = API_URL_CREATE_USER;
import { API_URL_LOGIN } from "@src/common/constants/api";

import axios from "axios";

import Auth0Btutton from "../auth/auth0-button/Auth0Button";

import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@common/utils/localStorage";
import { API_URL_CREATE_USER } from "@src/common/constants/api";
import { CLIENT_ID } from "@src/config/envs";

const Login = () => {

  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthenticated: isAuth0enticated, user, getAccessTokenSilently } = useAuth0();
  const { isAuthenticated, setAuthenticated } = useAuth();

  const handleSilentLogin = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      return accessToken;
    } catch (error) {
      console.error("Error al obtener el token de acceso:", error);
    }
  };

  const getAuthToken = async ()=>{
    const token = await handleSilentLogin();
    return token;
  }

  const handleAuth0LoginWhitRegister = async () => {
    const token = await handleSilentLogin();

    setAuthenticated(true);

    const userData = {
      name: user.given_name,
      lastname: user.family_name,
      email: user.email,
      password: `${token}`,
      role: "null",
    }
    console.log(userData)
    try {
      await axios.post(apiUrl, userData);
      window.alert("Usuario creado correctamente");
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error.message);
      window.alert("Error al crear usuario");
    }
  }

  const handleAuth0LoginLogin = async() => {
    try {
      const token = await getAuthToken();
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email: user.email,
          password: token,
        }
      );

      saveToLocalStorage("session", {
        userId: response.data.userId,
        token: response.data.token,
      });

      if (response.data.token) {
        window.alert("Inicio de sesion completado");
      }
    } catch (error) {
      window.alert("error en correo o contraseña");
      console.error("Error al iniciar sesión:", error.message);
    }
  }

  const integrateLogin = async()=>{
    await handleAuth0LoginWhitRegister();
    await handleAuth0LoginLogin();
  }

  useEffect(() => {
    console.log("LOGIN COMPONENT IS AUTH0", isAuth0enticated, user);
    if (isAuth0enticated) {

      integrateLogin();
    }

  }, [isAuth0enticated])

  const redirectUser = (condition, destination) => {
    useEffect(() => {
      if (condition) {
        //navigate(destination);
      }
    }, [condition]);
  };

  redirectUser(isAuthenticated, routerNames["offers"]);

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


  if (auth.isAuthenticated) {
    return navigate(routerNames["offers"]);
  }

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
