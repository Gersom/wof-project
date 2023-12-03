import { Link } from "react-router-dom";
import { useState } from "react";
import routerNames from "@src/common/constants/routes";
import logo from "@icons/nav/logo.svg";
import PasswordIcon from "@icons/password.svg?react";
import EmailIcon from "@icons/email.svg?react";
import styles from "./styles.module.scss";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Auth0Btutton from "../../auth/auth0-button/Auth0Button";
import DefaultButton from "@components/buttons/DefaultButton"
import SignInIcon from "@icons/login/sign-in.svg?react"

const FormLogin = ({ onSubmitValidated = ()=>null }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = e.target.elements.email.value;
    const passwordValue = e.target.elements.password.value;

    onSubmitValidated({
      email: emailValue,
      password: passwordValue,
    })
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
              <DefaultButton 
                onAction={handleSubmit}
                background={true}
                size="normal"
                iconFill="fill"
                label="Ingresar">
                <SignInIcon />
              </DefaultButton>
              <div style={{marginBottom: "15px"}}></div>
              <div className={styles["register-container"]}>
                <label>
                  ¿No tienes cuenta?&nbsp;
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

export default FormLogin;
