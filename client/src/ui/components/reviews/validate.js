export const validate = (state, name) => {
  const newErrors = { ...state.errors };

  if (name === "name") {
    if (state.name === "") {
      newErrors.name = "Por favor, ingresa tu nombre";
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
    if (state.name.length < 30 || state.name.length > 300) {
      newErrors.name =
        "La reseña debe tener al menos 30 caracteres y no más de 300";
    }
  }
  return newErrors;
};
