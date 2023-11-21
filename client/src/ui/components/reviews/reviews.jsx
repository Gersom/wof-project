import React from "react";

const Reviews = () => {
  return (
    <div>
      <form>
        <h3>Deja tu reseña</h3>
        <h4>Puntuación:⭐⭐⭐⭐⭐</h4>
        <textarea
          placeholder="Escribe tu reseña..."
          cols="15"
          rows="10"
        ></textarea>
        <button>Cancelar</button>
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default Reviews;
