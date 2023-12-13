import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import starReview from "@icons/starReview.svg";

const CaregiverCard = ({ customerData }) => {
  const { pet, caregiver, startDate, endDate, address } = customerData;
  const {
    name: caregiverName,
    profilePicture: caregiverPicture,
    rating: caregiverRating,
    price: caregiverPrice,
  } = caregiver;
  const { name: petName, species: petSpecies, breed: petBreed } = pet;

  const [formatedDate, setFormatedDate] = useState(null);

  const formatDates = () => {
    const startServiceDate = new Date(startDate);
    const endServiceDate = new Date(endDate);

    const startDay = startServiceDate.getDate();
    const endDay = endServiceDate.getDate();
    const month = startServiceDate.toLocaleString("es-LA", { month: "short" });

    const formattedDate = `${startDay} al ${endDay} de ${month} `;

    setFormatedDate(formattedDate);
  };

  useEffect(() => {
    formatDates();
  }, []);
  return (
    <div className={styles.article}>
      <figure>
        <img src={caregiverPicture} alt={`${caregiverName} foto de perfil`} />
        <figcaption>
          <h3>{caregiverName}</h3>
        </figcaption>
      </figure>
      <div className={styles.cont}>
        <div className={styles.contSec}>
          <h5>
            Puntuación :{" "}
            <span>
              {" "}
              <img src={starReview} alt="starReview" />
              {caregiverRating}
            </span>
          </h5>
        </div>
        <hr className={styles.separator}></hr>
        <div className={styles.contInfo}>
          <h4>
            {petName.charAt(0).toUpperCase() + petName.slice(1)} - {petBreed}
          </h4>
          <div className={styles.dates}>
            <div className={styles.textDates}>
              <h5 className={styles.date}>{formatedDate}</h5>
              <h4 className={styles.address}>{address}</h4>
            </div>
          </div>
          <div className={styles.contPrice}>
            <h4>Total: ${caregiverPrice}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverCard;
