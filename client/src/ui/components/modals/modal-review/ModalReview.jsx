import { useSelector } from "react-redux";
import CardUser from "../../cards/card-user/CardUser";
import FormReview from "../../forms/form-review/FormReview";
import styles from "./styles.module.scss";
import cross from "@icons/cross.svg";

const ModalReview = ({ reviewsData, role, closeModal }) => {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className={styles.containerFlex}>
      <div className={styles.background} onClick={() => closeModal()}></div>
      <div className={styles.container}>
        <div
          className={styles.closeButton}
          onClick={() => closeModal()}
          style={{ backgroundImage: "url('" + cross + "')" }}
        ></div>
        <h1>Cuenta tu experiencia</h1>
        <h3>Déjanos tu reseña</h3>
        <div className={styles.subContTwo}>
          <CardUser
            name={user.name}
            role={user.role}
            address={user.address}
            imgSrc={user.profilePicture}
          />

          <FormReview className={styles.formReview} reviewsData={reviewsData}/>
        </div>
      </div>
    </div>
  );
};

export default ModalReview;
