import styles from "./styles.module.css";
import React from "react";
import { MdStarOutline } from "react-icons/md";
import { useState } from "react";

const FormReview = () => {
  const [rating, setRating] = useState(null);
  const [state, setState] = useState({
    name: "",
    rating: 0,
    review: "",
  });
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MdStarOutline
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //dispatch postReview(state);
  };

  return (
    <div className={styles.cont}>
      <form onSubmit={handleSubmit}>
        <h3>Deja tu reseña</h3>
        <label>Nombre</label>
        <input onChange={handleChange} type="text" name="name" />
        <h4>Puntuación: {renderStars()}</h4>
        <textarea
          placeholder="Escribe tu reseña..."
          cols="15"
          rows="10"
        ></textarea>
        <button className={styles.btnCancel}>Cancelar</button>
        <button className={styles.btnSubmit} type="submit">
          Publicar
        </button>
      </form>
    </div>
  );
};

export default FormReview;
