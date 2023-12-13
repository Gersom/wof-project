import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@common/context/authProvider";
import { useAuth0 } from "@auth0/auth0-react";
import {
  API_URL_LOGIN,
  API_URL_REGISTER,
  API_URL_USER,
  API_URL_EXIST_USER_WHIT_EMAIL,
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
  const apiUrlRegister = API_URL_REGISTER;
  const apiUrlCheckUserExistence = API_URL_EXIST_USER_WHIT_EMAIL;
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

  const manageSpecialLogin = async () => {
    console.log('funcion => manageSpecialLogin')
    const token = await handleSilentLogin();
    const response = await axios.post(API_URL_LOGIN, {
      email: user.email,
      password: token,
    });
    console.log("SPECIAL LOGIN USER", response, user.email, token);

    saveToLocalStorage("session", {
      userId: response.data.userId,
      token: response.data.token,
    });
    manageRedirection();
  };

  const handleAuth0Register = async () => {
    console.log('funcion => handleAuth0Register')
    const token = await handleSilentLogin();

    const userData = {
      name: user.given_name,
      lastname: user.family_name,
      email: user.email,
      password: `${token}`,
      profilePicture: user.picture,
      role: "",
    };
    console.log("handleAuth0Register: ", token);
    console.log("regiter TOKEN: ", token);

    try {
      const { data } = await axios.get(
        apiUrlCheckUserExistence + `${userData.email}`
      );
      const exist = data;

      if (!exist) {
        console.log("EMAIL NOT FOUND! REGISTER NEW USER");
        try {
          const info = await axios.post(apiUrlRegister, userData);
          console.log("REGISTER NEW USER", info);
          await manageSpecialLogin();
          // if (info.statusText === "Created") {
          // }
        } catch (error) {
          console.error(`Error creating new user): ${error.message}`);
        }
      } else {
        console.log("EMAIL FOUND! LOGIN USER");
        const response = await axios.post(API_URL_LOGIN, {
          email: user.email,
          password: token,
        });
        console.log("NORMAL LOGIN USER", user.email, token);

        saveToLocalStorage("session", {
          userId: response.data.userId,
          token: response.data.token,
        });
        await manageRedirection();
      }
      //console.log("DATA REGISTER AUTH0" ,data);
    } catch (error) {
      console.error(`Error verifing email existence): ${error.message}`);
    }
  };

  const integrateLogin = async () => {
    try {
      await Promise.all([handleAuth0Register()]);
      manageRedirection();
    } catch (error) {
      console.error(
        "Error durante la integraci贸n del inicio de sesi贸n:",
        error
      );
    }
  };

  const manageRedirection = async () => {
    console.log('funcion => manageRedirection')
    const storage = await getFromLocalStorage("session");

    if(storage.userId){
      const { data } =
        (await axios.get(`${API_URL_USER}/${storage?.userId}`)) || {};
      const { role } = data || {};
  
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
          return redirectTo(routerNames["offersCaregivers"]);
        case "owner":
          return redirectTo(routerNames["myPets"]);
        default:
          return redirectTo(routerNames["profile"]);
      }
    }

  };

  // useEffect(() => {
  //   if (isAuth0enticated) {
  //     integrateLogin();
  //   }
  // }, [isLoading]);

  useEffect(() => {
    if (isAuth0enticated) {
      integrateLogin();
    }
    if (isAuthenticated) {
      manageRedirection();
    }
  }, [isAuthenticated, isAuth0enticated, navigate, isLoading]);

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
            <div className={styles["input_container"]}>
              <label htmlFor="email">
                <span>
                  Estamos verificando su inicio de sesión, no nos tomará mucho
                  tiempo, gracias por confiar en nosotros.
                </span>
              </label>
            </div>
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
