import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
// import { getReviews } from "@src/common/utils/helpers-redux/getReviews";
// import { useDispatch, useSelector } from "react-redux";

const CardReviewPets = () => {
  let reviews = [
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
      name: "Gabriel",
      image:
        "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      rating: "2.0",
      comment:
        "Ese perro es muy problemático, me saca la lengua a cada rato, me babea el mueble, cero recomendado.",
      from: "caregiver",
      to: "owner",
      createdAt: "2023-11-25T17:49:07.213Z",
      updatedAt: "2023-11-25T17:49:07.213Z",
      caregiverId: 2,
      ownerId: 1,
      name: "Gaby",
      image:
        "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  // const dispatch = useDispatch();
  // const reviews = useSelector((reviewsState) => reviewsState.reviews);

  // useEffect(() => {
  //   dispatch(getReviews());
  // }, []);
  const [formattedDates, setFormattedDates] = useState([]);

  const formatDates = () => {
    const formatted = reviews.map((review) => {
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
        {reviews &&
          reviews.map((review, index) => (
            <div key={review.id}>
              <h5 className={styles.paragraph}>"{review.comment}"</h5>
              <div className={styles.infoPerson}>
                <img
                  className={styles.profilePic}
                  src={review.image}
                  alt="Foto de Perfil"
                />
                <div className={styles.textInfo}>
                  <p className={styles.personName}>{review.name}</p>
                  <p className={styles.date}>{formattedDates[index]}</p>
                </div>
              </div>
              {index < reviews.length - 1 && (
                <hr className={styles.secondRounded}></hr>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardReviewPets;
