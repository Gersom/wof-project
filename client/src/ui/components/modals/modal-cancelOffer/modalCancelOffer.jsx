import styles from "./styles.module.scss";

const ModalCancelOffer = ({ message, nameOwner }) => {
  return (
    <div className={styles.container}>
      <h1>¡OH NO!</h1>
      <h3>Oferta cancelada</h3>
      <section>
        <h4>
          Tu oferta ya ha sido eliminada. ¡Esperemos verte en otra oferta!
        </h4>
      </section>
    </div>
  );
};

export default ModalCancelOffer;
