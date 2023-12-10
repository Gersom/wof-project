import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@common/context/authProvider";
import { useAuth0 } from "@auth0/auth0-react";
import {
  API_URL_LOGIN,
  API_URL_REGISTER,
  API_URL_USER,
} from "@src/common/constants/api";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@common/utils/localStorage";
import routerNames from "@src/common/constants/routes";
import styles from "./styles.module.scss";
import logo from "@icons/nav/logo.svg";

// ... (imports)

const VerifyingLogin = () => {
  const apiUrl = API_URL_REGISTER;
  const navigate = useNavigate();
  const {
    isAuthenticated: isAuth0enticated,
    user,
    getAccessTokenSilently,
    isLoading,
  } = useAuth0();
  const { isAuthenticated, setAuthenticated } = useAuth();

  const handleSilentLogin = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      return accessToken;
    } catch (error) {
      console.error(`Error al obtener el token de acceso: ${error}`);
      throw error;
    }
  };

  const getAuthToken = async () => await handleSilentLogin();

  const handleAuth0LoginWhitRegister = async () => {
    const token = await handleSilentLogin();

    setAuthenticated(true);

    const userData = {
      name: user.given_name,
      lastname: user.family_name,
      email: user.email,
      password: `${token}`,
      profilePicture: user.picture,
      role: "",
    };

    try {
      await axios.post(apiUrl, userData);
      // window.alert("Usuario creado correctamente");
    } catch (error) {
      console.error(`Error al realizar la solicitud POST: ${error.message}`);
      // window.alert("Error al crear usuario");
    }
  };

  const handleAuth0LoginLogin = async () => {
    try {
      const token = await getAuthToken();
      const response = await axios.post(API_URL_LOGIN, {
        email: user.email,
        password: token,
      });

      saveToLocalStorage("session", {
        userId: response.data.userId,
        token: response.data.token,
      });
      manageRedirection();
      if (response.data.token) {
        console.warn("Inicio de sesión completado");
      }
    } catch (error) {
      console.warn("Error en correo o contraseña");
      console.error(`Error al iniciar sesión: ${error.message}`);
    }
  };

  const integrateLogin = async () => {
    try {
      await Promise.all([
        handleAuth0LoginWhitRegister(),
        handleAuth0LoginLogin(),
      ]);
    } catch (error) {
      console.error(
        "Error durante la integración del inicio de sesión:",
        error
      );
    }
  };

  const manageRedirection = async () => {
    const storage = await getFromLocalStorage("session");

    const { data } = (await axios.get(`${API_URL_USER}/${storage?.userId}`)) || {};
    const { role = "" } = data || {};

    if (!data) return;

    setAuthenticated(true);

    const redirectTo = (path) => {
      if (
        storage?.history &&
        storage?.history !== routerNames["loading"] &&
        storage?.history !== routerNames["landing"]
      ) {
        navigate(storage.history);
      } else {
        navigate(path);
      }
    };

    switch (role) {
      case "caregiver":
        redirectTo(routerNames["offersCaregivers"]);
        break;
      case "owner":
        redirectTo(routerNames["myPets"]);
        break;
      default:
        redirectTo(routerNames["profile"]);
    }
  };

  useEffect(() => {
    // console.log("LOGIN COMPONENT IS AUTH0", isAuth0enticated, user);
    if (isAuth0enticated) {
      integrateLogin();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      manageRedirection();
    }
  }, [isAuthenticated, navigate]);

  const resetLocal = () => {
    saveToLocalStorage("session", "");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles["form-container"]}>
        <div className={styles["logo_container"]}>
          <img src={logo} alt="Logo" />
          <span>.com</span>
        </div>
        <div>
          <h1>Cargando ...</h1>
          <div className={styles["form_auth_hr"]}></div>
        </div>
        <div className={styles["auth_form"]}>
          <form>
            <di className={styles["input_container"]}>
              <label htmlFor="email">
                <span>
                  Estamos verificando su inicio de sesión, no nos tomará mucho
                  tiempo, gracias por confiar en nosotros 💖
                </span>
              </label>
            </di>
          </form>
        </div>

        <div className={styles["auth_form"]}>
          <form>
            <div className={styles["input_container"]}>
              <label htmlFor="email">
                <span>
                  Si no le redireccionamos en unos 10 segundos, puedes volver a
                  intentarlo.
                </span>
              </label>
              <button className={styles.buttonBlue} onClick={resetLocal}>
                Volver a intentar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyingLogin;
