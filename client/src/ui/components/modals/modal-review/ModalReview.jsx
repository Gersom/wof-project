import CardUser from "../../cards/card-user/CardUser";
import FormReview from "../../reviews/FormReview";
import styles from "./styles.module.scss";

const ModalReview = () => {
  return (
    <div className={styles.containerOne}>
      <div className={styles.subContOne}>
        <h1 className={styles.reviewTitle}>Deja tu Reseña</h1>
        <h3 className={styles.reviewSub}>Cuéntanos como fue tu experiencia</h3>
      </div>
      <div className={styles.subContTwo}>
        <CardUser className={styles.cardUser} />{" "}
        <FormReview className={styles.formReview} />
      </div>
    </div>
  );
};

export default ModalReview;
