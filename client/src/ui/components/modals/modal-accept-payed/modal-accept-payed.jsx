import styles from "./styles.module.scss";

const ModalAcceptPayed = ({ message, nameOwner }) => {
  return (
    <div className={styles.container}>
      <h1>¡Felicidades!</h1>
      <h3>Tu oferta ha sido aceptada y pagada</h3>
      <section>
        <h4>El siguiente paso es comunicarte con</h4>
        <h2>{nameOwner}</h2>
        <h4>
          Ahora podras ver su información de contacto en la misma pagina. y
          brindar el servicio de Cuidado de mascota, una ves comcluya el
          servicio se te enviara el pago a tu cuenta bancaria registrada.
        </h4>
      </section>
    </div>
  );
};

export default ModalAcceptPayed;
