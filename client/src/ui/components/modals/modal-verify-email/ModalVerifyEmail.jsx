import styles from "./styles.module.scss";
import mail from "@icons/mail.svg";
import { useState } from "react";

const ModalVerifyEmail = ({ email, onSubmit}) => {
  const [code, setCode] = useState("");

  return (
    <div className={styles.container}>
      <h1>Verifica tu email</h1>
      <h3>{email}</h3>
      <section>
        <p className={styles.subtitulo}>
          <img src={mail} alt="mail" className={styles.mail} />
          Code :
        </p>
        <input
          placeholder="Código de email..."
          className={styles.input}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></input>   
      </section>
      <button className={styles.boton} onClick={() => onSubmit(code)}>Registrarse</button>
    </div>
  );
};

export default ModalVerifyEmail;
