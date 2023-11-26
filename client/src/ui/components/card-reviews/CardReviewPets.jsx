import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const CardReviewPets = () => {
  let arrayReviews = [
    {
      id: 1,
      rating: "4.5",
      comment:
        "Anny fue muy correcta al describir su mascota, me gusto tenerlo en mi casa, no causa problemas y avisa cuando tiene que ir al baño.",
      from: "caregiver",
      to: "owner",
      createdAt: "2023-11-25T17:49:07.213Z",
      updatedAt: "2023-11-25T17:49:07.213Z",
      caregiverId: 1,
      ownerId: 1,
    },
    {
      id: 2,
      rating: "2.0",
      comment:
        "Ese perro es muy problematico, me saca la lengua a cada rato, me babea el mueble, cero recomendado",
      from: "caregiver",
      to: "owner",
      createdAt: "2023-11-25T17:49:07.213Z",
      updatedAt: "2023-11-25T17:49:07.213Z",
      caregiverId: 2,
      ownerId: 1,
    },
  ];

  const [formattedDates, setFormattedDates] = useState([]);

  const formatDates = () => {
    const formatted = arrayReviews.map((review) => {
      const reviewDate = new Date(review.createdAt);
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
        {arrayReviews.map((review, index) => (
          <div key={review.id}>
            <h5 className={styles.paragraph}>{review.comment}</h5>
            <div className={styles.infoPerson}>
              <img
                className={styles.profilePic}
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Foto de Perfil"
              />
              <div className={styles.textInfo}>
                <p className={styles.personName}>Gabriel</p>
                <p className={styles.date}>{formattedDates[index]}</p>
              </div>
            </div>
            {index < arrayReviews.length - 1 && (
              <hr className={styles.secondRounded}></hr>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardReviewPets;
