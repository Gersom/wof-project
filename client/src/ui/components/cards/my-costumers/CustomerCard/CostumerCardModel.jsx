import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import starReview from "@icons/starReview.svg";

const CustomerCardModel = ({ customerData }) => {
  const { pet, owner, startDate, endDate, address } = customerData;
  const {
    name: ownerName,
    profilePicture: ownerPicture,
    rating: ownerRating,
  } = owner;
  const { name: petName, species: petSpecies, breed: petBreed } = pet;

  const [formattedServiceStartDate, setFormattedServiceStartDate] = useState(
    []
  );
  const [formattedServiceEndDate, setFormattedServiceEndDate] = useState([]);

  const formatDates = () => {
    const startServiceDate = new Date(startDate);
    const endServiceDate = new Date(endDate);

    const startDay = startServiceDate.getDate();
    const endDay = endServiceDate.getDate();
    const month = startServiceDate.toLocaleString("es-LA", { month: "short" });
    const year = startServiceDate.getFullYear();

    const formattedStartDate = `${startDay} de ${month} ${year}`;
    const formattedEndDate = `${endDay} de ${month} ${year}`;

    setFormattedServiceStartDate(formattedStartDate);
    setFormattedServiceEndDate(formattedEndDate);
  };

  useEffect(() => {
    formatDates();
  }, []);
  return (
    <div className={styles.article}>
      <figure>
        <img src={ownerPicture} alt={`${ownerName} foto de perfil`} />
        <figcaption>
          <h3>{ownerName}</h3>
        </figcaption>
      </figure>
      <div className={styles.cont}>
        <div className={styles.contSec}>
          <h5>Puntuación :</h5>
          <img src={starReview} alt="starReview" />
          <h4>{ownerRating}</h4>
        </div>
        <hr className={styles.separator}></hr>
        <div>
          <h4>
            {petSpecies} {petName} - {petBreed}
          </h4>
          <h4 className={styles.address}>{address}</h4>
          <hr className={styles.separatorSec}></hr>
          <div className={styles.dates}>
            <div className={styles.textDates}>
              {" "}
              <h5 className={styles.date}>
                <p className={styles.texts}>Desde: </p>
                {formattedServiceStartDate}
              </h5>
            </div>
            <div className={styles.textDates}>
              <h5 className={styles.date}>
                <p className={styles.texts}>Hasta: </p>
                {formattedServiceEndDate}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCardModel;
