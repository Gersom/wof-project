import logo from "@images/landing/logo.svg";
import styles from "./styles.module.scss";

const Login = () => {
  return (
    <>
      <div className={styles.home}>
        <img className={styles.image} src={logo} alt="Logo" />
        <h1>Iniciar Sesion</h1>
        <form action="">
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" />
          <br />
          <label htmlFor="password">Contraseña: </label>
          <input type="password" name="password" />
          <br />
          <button type="submit">Enviar</button>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </>
  );
};

export default Login;
