export const validation = (dataForm, errors, setErrors) => {
  // Validar el Correo Electrónico
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataForm.email)) {
    setErrors({
      ...errors,
      email: "Ingrese un correo electrónico válido",
    });
  } else if (dataForm.email.trim() === "") {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "El campo está vacío",
    }));
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  }

  // Validar el Nombre
  if (dataForm.name.length < 3) {
    setErrors({
      ...errors,
      name: "El Nombre debe conterner al menos 3 caracteres",
    });
  } else if (dataForm.name.length > 30) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: "El Nombre no puede superar los 30 caracteres",
    }));
  } else if (
    /\d/.test(dataForm.name) ||
    /[!@#$%^&*(),.?":{}|<>]/.test(dataForm.name)
  ) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: "El nombre no debe contener números o caracteres especiales",
    }));
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
  }

  // Validar la Contraseña
  const minLength = 6;
  const maxLength = 15;

  if (
    dataForm.password.length < minLength ||
    dataForm.password.length > maxLength
  ) {
    setErrors({
      ...errors,
      password: `La contraseña debe tener entre ${minLength} y ${maxLength} caracteres`,
    });
  } else if (!/\d/.test(dataForm.password)) {
    setErrors({
      ...errors,
      password: "La contraseña debe contener al menos un número",
    });
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(dataForm.password)) {
    setErrors({
      ...errors,
      password: "La contraseña debe contener al menos un carácter especial",
    });
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
  }

  // Validar el Apellido
  if (dataForm.lastName.length < 3) {
    setErrors({
      ...errors,
      lastName: "El Nombre debe conterner al menos 3 caracteres",
    });
  } else if (dataForm.lastName.length > 30) {
    setErrors({
      ...errors,
      lastName: "El Apellido no puede superar los 30 caracteres",
    });
  } else if (
    /\d/.test(dataForm.lastName) ||
    /[!@#$%^&*(),.?":{}|<>]/.test(dataForm.lastName)
  ) {
    setErrors({
      ...errors,
      lastName: "El Apellido no debe contener números o caracteres especiales",
    });
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, lastName: "" }));
  }
};
