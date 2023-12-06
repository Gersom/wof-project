
import styles from "./styles.module.scss";

const ModalCancelOffer = ({ nameOwner }) => {


  return (
    <div className={styles.container}>
      <h1>¡OH NO!</h1>
      <h3>OFERTA CANCELADA</h3>
      <section>
        <h4>Tu oferta la hemos eliminado</h4>
        <h2>{nameOwner}</h2>
        <h4> ya no podra ver tu oferta</h4>
      </section>
    </div>
  );
};

export default ModalCancelOffer;
