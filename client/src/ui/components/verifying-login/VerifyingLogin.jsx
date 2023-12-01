import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@src/context/auth-provider/authProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL_LOGIN, API_URL_REGISTER, API_URL_USER } from "@src/common/constants/api";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@common/utils/localStorage";
import routerNames from "@src/common/constants/routes";
import styles from "./styles.module.scss";
import logo from "@icons/nav/logo.svg";


const VerifyingLogin = () => {
  const apiUrl = API_URL_REGISTER;
  const navigate = useNavigate();
  const { isAuthenticated: isAuth0enticated, user, getAccessTokenSilently, isLoading } = useAuth0();
  const { isAuthenticated, setAuthenticated } = useAuth();


  const handleSilentLogin = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      return accessToken;
    } catch (error) {
      console.error("Error al obtener el token de acceso:", error);
    }
  };

  const getAuthToken = async () => {
    const token = await handleSilentLogin();
    return token;
  };

  const handleAuth0LoginWhitRegister = async () => {
    const token = await handleSilentLogin();

    setAuthenticated(true);

    const userData = {
      name: user.given_name,
      lastname: user.family_name,
      email: user.email,
      password: `${token}`,
      profilePicture: user.picture,
      role: "null",
    };

    try {
      await axios.post(apiUrl, userData);
      window.alert("Usuario creado correctamente");
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error.message);
      window.alert("Error al crear usuario");
    }
  };

  const handleAuth0LoginLogin = async () => {
    try {
      const token = await getAuthToken();
      const response = await axios.post(
        API_URL_LOGIN,
        {
          email: user.email,
          password: token,
        }
      );

      saveToLocalStorage("session", {
        userId: response.data.userId,
        token: response.data.token,
      });
      manageRedirection()
      if (response.data.token) {
        console.warn("Inicio de sesion completado");
      }
    } catch (error) {
      console.warn("error en correo o contraseña");
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const integrateLogin = async () => {
    await handleAuth0LoginWhitRegister();
    await handleAuth0LoginLogin();
  };

  const manageRedirection = async () => {
    const storage = await getFromLocalStorage("session");

    const { data } = await axios.get(API_URL_USER + "/" + storage?.userId);
    console.log("DATA USER ID", data);

    console.log(data.role)
    console.log(storage?.history)
    switch (data.role) {
      case "caregiver":
        // console.log(allLocal);
        setAuthenticated(true);
        if (!storage?.history === "/verificando") {
          console.log("INTERNAL  HISTORY",history);
          navigate(history);
        if (storage?.history && storage?.history !== "/" && storage?.history !== "/verificando") {
          // console.log("INTERNAL  HISTORY",history);
          navigate(storage.history);
          return;
        }
        navigate(routerNames["offersCaregivers"]);

        return;
      case "owner":
        setAuthenticated(true);
        if (storage?.history && storage?.history !== "/" && storage?.history !== "/verificando") {
          navigate(storage.history);
          return;
        }
        navigate(routerNames["myPets"]);
        return;
      default:
        setAuthenticated(true);
        if (storage?.history) {
          navigate(history);
          return;
        }
        navigate(routerNames["profile"]);
        return;
    }
  };

  useEffect(() => {
    //console.log("LOGIN COMPONENT IS AUTH0", isAuth0enticated, user);
    if (isAuth0enticated) {
      integrateLogin();
    }
  }, [isLoading]);

  // useEffect(() => {
  //   console.log('LOCAL AUTH STATE', isAuthenticated);
  //   manageRedirection();
  // }, [isAuthenticated])
  
  useEffect(() => {
    if(isAuthenticated){
      manageRedirection();
    }
  }, [isAuthenticated]);

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
            <div className={styles["input_container"]}>
              <label htmlFor="email">
                <span>Espere un momento, estamos verificando su inicio de sesión, no nos tomará mucho tiempo, gracias por confiar en nosotros 💖</span>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyingLogin;
