import styles from "./styles.module.scss";
import logo from "@icons/nav/logo.svg";

const Login = () => {

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
};

export default Login;
