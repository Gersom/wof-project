import { useSelector } from "react-redux";
import CardUser from "../../cards/card-user/CardUser";
import FormReview from "../../reviews/FormReview";
import styles from "./styles.module.scss";

const ModalReview = ({ ownerId, caregiverId, role }) => {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className={styles.container}>
      <h1>Cuenta tu experiencia</h1>
      <h3>Déjanos tu reseña</h3>
      <div className={styles.subContTwo}>
        <CardUser
          name={user.name}
          role={user.role}
          address={user.address}
          imgSrc={user.profilePicture}
        />

        <FormReview className={styles.formReview} />
      </div>
    </div>
  );
};

export default ModalReview;
