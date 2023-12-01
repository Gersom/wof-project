import styles from "./styles.module.scss";

const ModalSendOffer = ({ message, nameOwner }) => {
  return (
    <div className={styles.container}>
      <h1>¡Genial!</h1>
      <h3>Propuesta enviada</h3>
      <section>
        <h4>Tu oferta fue publicada y ahora</h4>
        <h2>{nameOwner}</h2>
        <h4>podrá ver tu tarifa y seleccionarte para cuidar a su mascota.</h4>
      </section>
    </div>
  );
};

export default ModalSendOffer;
