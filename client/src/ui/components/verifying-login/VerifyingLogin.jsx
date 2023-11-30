import { useAuth } from "@src/context/auth-provider/authProvider";
import styles from "./styles.module.scss";
import logo from "@icons/nav/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";

import { useEffect } from "react";
import axios from "axios";
import { API_URL_REGISTER, API_URL_USER } from "@src/common/constants/api";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@common/utils/localStorage";
import routerNames from "@src/common/constants/routes";
import { useNavigate } from "react-router-dom";

const VerifyingLogin = () => {
  const auth = useAuth();
  const apiUrl = API_URL_REGISTER;
  const navigate = useNavigate();


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

  const redirectUser = (condition, destination) => {
    useEffect(() => {
      if (condition) {
        navigate(destination);
      }
    }, [condition]);
  };


  const getAuthToken = async () => {
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
      profilePicture: user.picture,
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


  const handleAuth0LoginLogin = async () => {
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

  const integrateLogin = async () => {
    await handleAuth0LoginWhitRegister();
    await handleAuth0LoginLogin();
  }

  const manageRedirection=async()=>{
    const {userId} = getFromLocalStorage("session");
  
    const {data} = await axios.get(
      API_URL_USER+"/"+userId,
    );
    console.log("DATA USER ID", data);
    switch (data.role) {
      case "caregiver":
        navigate(routerNames["offersCaregivers"]);
        break;
      case "owner":
        navigate(routerNames["myPets"]);
        break;
      
      default:
        navigate(routerNames["profile"]);
        break;
    }
  }

  useEffect(() => {
    console.log("LOGIN COMPONENT IS AUTH0", isAuth0enticated, user);
    if (isAuth0enticated) {

      integrateLogin();
    }

  }, [isAuth0enticated])

  
  useEffect(() => {
    console.log('LOCAL AUTH STATE',isAuthenticated);
    manageRedirection();
  }, [isAuthenticated]);



  //#region Loading_Screen  
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
          <form >
            <div className={styles["input_container"]}>
              <label htmlFor="email">
                <span>Espere un momento, estamos verificando su inicio de sessión, no nos tomará mucho tiempo, gracias por confiar en nosotros 💖</span>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  //#endregion
};

export default VerifyingLogin;
