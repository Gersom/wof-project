import styles from "./styles.module.css";
import React from "react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const FormReview = () => {
  const [rating, setRating] = useState(0);
  const [state, setState] = useState({
    name: "",
    rating: 1,
    review: "",
  });
  console.log(state);
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          onClick={() => setRating(i)}
          style={{ color: i <= rating ? "gold" : "gray", cursor: "pointer" }}
        />
      );
    }
    return stars;
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setState((emptyState) => ({
      ...emptyState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //ruta ¿postReview(state)?;
  };

  return (
    <div className={styles.cont}>
      <form onSubmit={handleSubmit}>
        <h3>Deja tu reseña</h3>
        <div className={styles.divider}></div>
        <label>Nombre:</label>
        <input onChange={handleChange} type="text" name="name" />
        <h4>Puntuación: {renderStars()}</h4>
        <textarea
          onChange={handleChange}
          placeholder="Escribe tu reseña..."
          cols="15"
          rows="10"
          name="review"
        ></textarea>
        <div className={styles.btnCont}>
          <button className={styles.btnCancel}>Cancelar</button>
          <div className={styles.separator}></div>
          <button className={styles.btnSubmit} type="submit">
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormReview;
