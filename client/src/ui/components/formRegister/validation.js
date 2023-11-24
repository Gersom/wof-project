export const validation = (dataForm, errors, setErrors) => {
  // Validar el Nombre
  if (dataForm.name.length > 30) {
    setErrors({
      ...errors,
      name: "El Nombre no puede superar los 30 caracteres",
    });
  } else if (
    /\d/.test(dataForm.name) ||
    /[!@#$%^&*(),.?":{}|<>]/.test(dataForm.name)
  ) {
    setErrors({
      ...errors,
      name: "El nombre no debe contener números o caracteres especiales",
    });
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
  }

  // Validar el Apellido
  if (dataForm.lastname.length > 30) {
    setErrors({
      ...errors,
      lastname: "El Apellido no puede superar los 30 caracteres",
    });
  } else if (
    /\d/.test(dataForm.lastname) ||
    /[!@#$%^&*(),.?":{}|<>]/.test(dataForm.lastname)
  ) {
    setErrors({
      ...errors,
      lastname: "El Apellido no debe contener números o caracteres especiales",
    });
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, lastname: "" }));
  }

  // Validar la Contraseña
  if (dataForm.password.length > 15) {
    setErrors({
      ...errors,
      password: "La contraseña debe tener maximo 15 caracteres",
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

  // Validar el Correo Electrónico
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataForm.email)) {
    setErrors({
      ...errors,
      email: "Ingrese un correo electrónico válido",
    });
  } else if (dataForm.email.trim() === "") {
    setErrors({
      ...errors,
      email: "El campo está vacío",
    });
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  }
};
