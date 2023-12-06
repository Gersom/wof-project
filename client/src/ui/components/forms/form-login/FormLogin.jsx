import { Link } from "react-router-dom";
import { useState } from "react";
import routerNames from "@src/common/constants/routes";
import LogoIcon from "@icons/company/logotype.svg?react";
import styles from "./styles.module.scss";
import Auth0Btutton from "../../auth/auth0-button/Auth0Button";
import DefaultButton from "@components/buttons/DefaultButton"
import SignInIcon from "@icons/login/sign-in.svg?react"
import EmailInput from "@components/inputs/EmailInput"
import PasswordInput from "@components/inputs/PasswordInput"
import { useDispatch } from "react-redux";
import { setAlert } from "@src/common/store/slices/alertSlice";

const FormLogin = ({
  onSubmitValidated = ()=>null,
  dark=false
}) => {
  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState({
    email: '', password: ''
  });

  const handleSubmit = async () => {
    let validations = true
    for (let clave in dataForm) {
      if (clave === '' || clave === false){
        validations = false;
        break;
      }
    }

    if(validations) {
      onSubmitValidated(dataForm)
    } else {
      dispatch(setAlert({ message: "Completa los todos los datos correctamente", type: "warning" }));
    }
  };

  const handleEmail = (e) => setDataForm({...dataForm, email: e})
  const handlePassword = (pass) => setDataForm({...dataForm, password: pass})

  return (
    <div className={`${styles.container} ${dark?styles.modeDark:''}`}>
      <div className={styles["form-container"]}>
        <div className={styles.formContent}>
          <div className={styles["logo_container"]}>
            <LogoIcon />
            <span>.com</span>
          </div>
          <div>
            <h1>Iniciar Sesion</h1>
          </div>

          <div className={styles["auth_form"]}>
            <form>
              <div className={styles["input_container"]}>
                <EmailInput 
                dark={dark} onValidated={handleEmail} />
              </div>
              <div className={styles["input_container"]}>
                <PasswordInput 
                dark={dark} validation={false} 
                onValidated={handlePassword} />
                <div className={styles["pasword-recovery-container"]}>
                  <Link to={routerNames["register"]}>
                    Olvidaste la contraseña?
                  </Link>
                </div>
              </div>
              
              <DefaultButton 
                type="button"
                background={true}
                size="large"
                iconFill="fill"
                label="Ingresar"
                onAction={handleSubmit}>
                <SignInIcon />
              </DefaultButton>
              <div style={{marginBottom: "10px"}}></div>
              <div className={styles["register-container"]}>
                <label style={dark?{color:'#fff'}:{}}>
                  ¿No tienes cuenta?&nbsp;
                </label>
                <Link to={routerNames["register"]}>
                  Regístrate
                </Link>
              </div>

            </form>
            <div className={styles["auth0Button"]}>
              <Auth0Btutton type={"service"} />
            </div>
          </div>

        </div>
      </div>
      <p className={styles["footer_credit"]}>
        <span>•</span>By Group 3<span>•</span>
      </p>
    </div>
  );
};

export default FormLogin;
