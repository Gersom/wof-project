import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const CardReviewPets = ({reviewsData}) => {
  
  const [formattedDates, setFormattedDates] = useState([]);

  const formatDates = () => {
    if (!reviewsData) {
      return; 
    }
    const formatted = reviewsData?.map((review) => {
      const reviewDate = new Date(review.date);
      const options = { year: "numeric", month: "long" };

      const monthName = reviewDate
        .toLocaleDateString("es-LA", { month: "long" })
        .replace(/^\w/, (c) => c.toUpperCase());
      return reviewDate
        .toLocaleDateString("es-LA", options)
        .replace(
          reviewDate.toLocaleDateString("es-LA", { month: "long" }),
          monthName
        );
    });

    setFormattedDates(formatted);
  };

  useEffect(() => {
    formatDates();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardCont}>
        <h3 className={styles.title}>Reseñas</h3>
        <hr className={styles.firstRounded}></hr>
        {reviewsData &&
          reviewsData.map((review, index) => (
            <div key={review.id}>
              <h5 className={styles.paragraph}>"{review.comment}"</h5>
              <div className={styles.infoPerson}>
                <img
                  className={styles.profilePic}
                  src={review.caregiver.profilePicture}
                  alt="Foto de Perfil"
                />
                <div className={styles.textInfo}>
                  <p className={styles.personName}>{review.caregiver.name}</p>
                  <p className={styles.date}>{formattedDates[index]}</p>
                </div>
              </div>
              {index < reviewsData.length - 1 && (
                <hr className={styles.secondRounded}></hr>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardReviewPets;
