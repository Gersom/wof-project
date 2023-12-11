export const validate = (state, name) => {
  const newErrors = { ...state.errors };

  if (name === "name") {
    if (state.name === "") {
      newErrors.name = "Por favor, ingresa tu nombre.";
    } else if (state.name.length > 15 || state.name.length < 3) {
      newErrors.name =
        "Tu nombre debe tener al menos 2 caracteres y no más de 15.";
    } else if (!/^[a-zA-Z-ñ\s]+$/.test(state.name)) {
      newErrors.name =
        'Tu nombre no debe tener símbolos ni caracteres especiales como "*/#!';
    } else {
      newErrors.name = "";
    }
  }
  if (name === "review") {
    if (/mierda|puta|cojuda|degraciasa|infeliz|imbécil/i.test(state.review)) {
      newErrors.review = "Evita el uso de palabras ofensivas o insultos";
    } else if (state.review.length < 30 || state.review.length > 300) {
      newErrors.review = "La reseña debe tener entre 30 y 300 caracteres.";
    } else if (state.review === "") {
      newErrors.review = "Por favor, escribe tu reseña.";
    } else {
      newErrors.review = "";
    }
  }
  return newErrors;
};
