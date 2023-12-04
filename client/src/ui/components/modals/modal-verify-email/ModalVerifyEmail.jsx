import styles from "./styles.module.scss";
import mail from "@icons/mail.svg";

const ModalVerifyEmail = ({ message, email }) => {
  return (
    <div className={styles.container}>
      <h1>Verifica tu email</h1>
      <h3>{email}</h3>
      <section>
        <p className={styles.subtitulo}>
          <img src={mail} alt="mail" className={styles.mail} />
          CODE :
        </p>
        <input
          placeholder="Código de email..."
          className={styles.input}
        ></input>
      </section>
      <button className={styles.boton}>Registrarse</button>
    </div>
  );
};

export default ModalVerifyEmail;
