import styles from "./styles.module.scss";
import React from "react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { validate } from "./validate";
import comment from "@icons/comment.svg";
import axios from "axios";
import { API_URL_REVIEWS } from "@src/common/constants/api";
import { useSelector } from "react-redux";

const FormReview = ({caregiverId,ownerId}) => {
  const user = useSelector((state) => state.userReducer.user);

  const [state, setState] = useState({
    rating: 1,
    review: "",
  });
  console.log(state);
  console.log(caregiverId,ownerId);
  const [errors, setErrors] = useState({
    review: "*Requerido",
  });

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          onClick={() => {
            setState((prevData) => ({
              ...prevData,
              rating: i,
            }));
          }}
          style={{
            color: i <= state.rating ? "gold" : "gray",
            cursor: "pointer",
          }}
        />
      );
    }
    return stars;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const newErrors = validate({ ...state, [name]: value }, name);
    setErrors({ ...errors, ...newErrors });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response;
    try {
      let dataToSend;
      console.log(user.role);
      if (user.role === "caregiver") {
        dataToSend = {
          rating: state.rating.toString(),
          comment: state.review,
          from: "caregiver",
          to: "owner",
          ownerId,
          caregiverId: user.caregiver.id,
        };
      } else if (user.role === "owner") {
        dataToSend = {
          rating: state.rating.toString(),
          comment: state.review,
          from: "owner",
          to: "caregiver",
          ownerId: user.owner.id,
          caregiverId,
        };
      }
      response = await axios.post(API_URL_REVIEWS, dataToSend);
      if (response.status === 200) {
        alert("¡Reseña enviada correctamente!");
      } else {
        alert("Hubo un problema al enviar la reseña.");
      }
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
      alert(
        "Hubo un error al enviar la reseña. Por favor, inténtelo de nuevo."
      );
    }
  };

  const isSubmitDisabled =
    Object.values(errors).some((error) => error !== "") || state.review === "";

  return (
    <div className={styles.cont}>
      <form onSubmit={handleSubmit}>
        <h3>Reseña</h3>
        <div className={styles.divider}></div>
        <span className={styles.errorReview}>{errors.name}</span>
        <h4>Puntuación: </h4>
        <span className={styles.stars}>{renderStars()}</span>
        <div>
          <h4>
            <img src={comment} className={styles.comment} />
            Comentario:
          </h4>
          <textarea
            onChange={handleChange}
            placeholder="Escribe tu reseña..."
            cols="45"
            rows="5"
            name="review"
            value={state.review}
          ></textarea>
          <span className={styles.errorReview}>{errors.review}</span>
        </div>
        <div className={styles.btnCont}>
          <button
            className={styles.btnSubmit}
            type="submit"
            disabled={isSubmitDisabled}
            style={{
              cursor: isSubmitDisabled ? "not-allowed" : "pointer",
              backgroundColor: isSubmitDisabled ? "lightgray" : "#52C1E4",
            }}
          >
            Guardar Reseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormReview;
