// Validar el Correo Electrónico
export const emailValidation = (dataForm, errors, setErrors, email) => {
  if (dataForm.email.trim() === "") {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataForm.email)) {
    setErrors({
      ...errors,
      email: "Ingrese un correo electrónico válido",
    });
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  }
};

// Validar el Nombre
export const nameValidation = (dataForm, setErrors, errors, name) => {
  if (dataForm.name.trim() === "") {
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: "",
    }));
  } else if (dataForm.name.length < 3) {
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
    setErrors({
      ...errors,
      name: "El nombre no debe contener números o caracteres especiales",
    });
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
  }
};

//Validar Apellido
export const lastNameValidation = (dataForm, setErrors, errors, lastName) => {
  if (dataForm.lastName.length < 3) {
    setErrors({
      ...errors,
      lastName: "El Apellido debe conterner al menos 3 caracteres",
    });
  } else if (dataForm.lastName.length > 30) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      lastName: "El Apellido no puede superar los 30 caracteres",
    }));
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

// Validar la Contraseña
export const passwordValidation = (dataForm, setErrors, errors, password) => {
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
};

// Validar el  cellPhone
export const cellPhoneValidation = (dataForm, cellPhone, errors, setErrors) => {
  if (!/^\+?\d+$/.test(dataForm.cellPhone)) {
    setErrors({
      ...errors,
      cellPhone:
        "Solo se permiten números (con opción de '+' al principio) en este campo",
    });
  } else if (dataForm.cellPhone.length < 10) {
    setErrors({
      ...errors,
      cellPhone: "El número de teléfono debe tener al menos 10 dígitos",
    });
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, cellPhone: "" }));
  }
};

// Validar numero de Documento
export const dniValidation = (dataForm, errors, setErrors, dni) => {
  if (!/^\d+$/.test(dataForm.dni)) {
    setErrors({
      ...errors,
      dni: "Solo se permiten números en este campo",
    });
  } else if (value.length !== 8) {
    setErrors({
      ...errors,
      dni: "El número de documento debe tener 8 dígitos",
    });
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, dni: "" }));
  }
};
