import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";

const Card = ({ nombre, nombre_mascota, horas, lugar, review, fechas }) => {
  return (
    <NavLink to={`/postulacion/${id}`} className="cardlink">
      <div className={styles.card - container}>
        <img className="card-image" src={image} alt={name} />
        <h2 className={styles.card - nombre}>{nombre}</h2>
        <h2 className={styles.card - apellido}>Mascota:{nombre_mascota}</h2>
        <h3 className={styles.card - subtitle}>{lugar}</h3>
        <h4>
          {fechas}, {horas}
        </h4>
        <h5>{review}</h5>
      </div>
    </NavLink>
  );
};

export default Card;
