import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { API_URL_REVIEWS_BYCAREGIVER, API_URL_REVIEWS_BYOWNER } from "@src/common/constants/api";
import axios from "axios";

const CardReviewPets = ({ id, role }) => {
  let URL = ''

  let roleContrario
  if (role === 'caregiver') {
    URL = `${API_URL_REVIEWS_BYCAREGIVER}${id}`
    roleContrario = 'owner'
  }
  if (role === 'owner') {
    URL = `${API_URL_REVIEWS_BYOWNER}${id}`
    roleContrario = 'caregiver'
  }
  const [reviewsData, setreviewsData] = useState([])

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(URL);
        setreviewsData(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getReviews()
    console.log(reviewsData);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardCont}>
        <h3 className={styles.title}>Reseñas</h3>
        <hr className={styles.firstRounded}></hr>
        {reviewsData &&
          reviewsData.map((review, index) => {
            const reviewDate = "2023-11-23T05:00:00.000Z";

     
            const dateObject = new Date(reviewDate);

        
            const day = dateObject.getDate();
            const monthIndex = dateObject.getMonth();
            const year = dateObject.getFullYear();

            const monthNames = [
              "Enero", "Febrero", "Marzo",
              "Abril", "Mayo", "Junio",
              "Julio", "Agosto", "Septiembre",
              "Octubre", "Noviembre", "Diciembre"
            ];

            const monthName = monthNames[monthIndex];

            const formattedDate = `${day} de ${monthName}`;

            return (
              <div key={review.id}>
                <h5 className={styles.paragraph}>"{review?.comment}"</h5>
                <div className={styles.infoPerson}>
                  <img
                    className={styles.profilePic}
                    src={review[roleContrario].user?.profilePicture}
                    alt="Foto de Perfil"
                  />
                  <div className={styles.textInfo}>
                    <p className={styles.personName}>{review.caregiver?.name}</p>
                    <p className={styles.date}>{formattedDate}</p>
                  </div>
                </div>
                {index < reviewsData.length - 1 && (
                  <hr className={styles.secondRounded}></hr>
                )}
              </div>
            )
          })}
      </div>
    </div>
  );
};

export default CardReviewPets;
