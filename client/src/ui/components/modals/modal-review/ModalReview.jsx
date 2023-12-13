import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CardUser from "../../cards/card-user/CardUser";
import FormReview from "../../forms/form-review/FormReview";
import styles from "./styles.module.scss";
import cross from "@icons/cross.svg";
import { API_URL_CAREGIVERS, API_URL_OWNERS } from "@src/common/constants/api";

const ModalReview = ({ reviewsData, closeModal, setNotification }) => {

  const role = useSelector((state) => state.userReducer.user.role);
  const [detailsUser, setDetailsUser] = useState({});

  const getDetailsUser = async () => {
    try {
      const url =
        role === "owner"
          ? `${API_URL_CAREGIVERS}${reviewsData.caregiverId}`
          : `${API_URL_OWNERS}/${reviewsData.ownerId}`;
      const response = await fetch(url);
      const data = await response.json();
      setDetailsUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetailsUser();
  }, []);


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
            name={detailsUser?.user?.name}
            role={detailsUser?.user?.role}
            address={detailsUser?.user?.address}
            imgSrc={detailsUser?.user?.profilePicture}
            rating={detailsUser?.rating}
          />

          <FormReview
            className={styles.formReview}
            reviewsData={reviewsData}
            closeModal={closeModal}
            setNotification={setNotification}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalReview;
