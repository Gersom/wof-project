// Función central para manejar la validación y actualizar el estado
export const handleValidation = (dataForm, setErrors) => {
  const errors = {};

  emailValidation(dataForm, errors);
  nameValidation(dataForm, errors);
  lastNameValidation(dataForm, errors);
  passwordValidation(dataForm, errors);
  cellPhoneValidation(dataForm, errors);
  dniValidation(dataForm, errors);

  setErrors(errors);
};

// Validar el Correo Electrónico
export const emailValidation = (dataForm, errors) => {
  if (dataForm.email === "") {
    errors.email = "";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataForm.email)) {
    errors.email = "Ingrese un correo electrónico válido";
  } else {
    errors.email = "";
  }
};

// Validar el Nombre
export const nameValidation = (dataForm, errors) => {
  if (dataForm.name === "") {
    errors.name = "";
  } else if (dataForm.name.length < 3) {
    errors.name = "El Nombre debe contener al menos 3 caracteres";
  } else if (dataForm.name.length > 30) {
    errors.name = "El Nombre no puede superar los 30 caracteres";
  } else if (
    /\d/.test(dataForm.name) ||
    /[!@#$%^&*(),.?":{}|<>]/.test(dataForm.name)
  ) {
    errors.name = "El nombre no debe contener números o caracteres especiales";
  } else {
    errors.name = "";
  }
};

// Validar el Apellido
export const lastNameValidation = (dataForm, errors) => {
  if (dataForm.lastName === "") {
    errors.lastName = "";
  } else if (dataForm.lastName.length < 3) {
    errors.lastName = "El apellido debe contener al menos 3 caracteres";
  } else if (dataForm.lastName.length > 50) {
    errors.lastName = "El apellido no puede superar los 50 caracteres";
  } else if (
    /\d/.test(dataForm.lastName) ||
    /[!@#$%^&*(),.?":{}|<>]/.test(dataForm.lastName)
  ) {
    errors.lastName =
      "El apellido no debe contener numeros ni caracteres especiales";
  } else {
    errors.lastName = "";
  }
};

// Validar la contraseña
export const passwordValidation = (dataForm, errors) => {
  // Si hay una contraseña se valida que sea de minimo 8 digitos y maximo 20
  if (dataForm.password !== "" && dataForm.password !== undefined) {
    if (dataForm.password.length < 7) {
      errors.password = "La contraseña debe tener al menos 7 dígitos";
    } else if (dataForm.password.length > 20) {
      errors.password = "La contraseña tiene demasiados dígitos";
    } else if (!/\d/.test(dataForm.password)) {
      errors.password = "La contraseña debe contener al menos un número";
    }
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(dataForm.password)) {
    errors.password =
      "La contraseña debe contener al menos un carácter especial";
  } else {
    errors.password = "";
  }
};

// Validador para confirmar la contraseña
export const confirmPasswordValidation = (dataForm, errors) => {
  if (
    dataForm.confirm_password !== "" &&
    dataForm.confirm_password !== undefined
  ) {
    if (dataForm.password !== dataForm.confirm_password) {
      errors.confirm_password = "Las contraseñas no coinciden";
    } else if (!/\d/.test(dataForm.password)) {
      errors.confirm_password =
        "La contraseña debe contener al menos un número";
    }
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(dataForm.password)) {
    errors.confirm_password =
      "La contraseña debe contener al menos un carácter especial";
  } else {
    errors.confirm_password = "";
  }
};

// Validar numero de telefono
export const cellPhoneValidation = (dataForm, errors) => {
  if (dataForm.cellPhone === "") {
    errors.cellPhone = "";
  } else if (!/^\+?\d+$/.test(dataForm.cellPhone)) {
    errors.cellPhone =
      "Solo se permiten números (con opción de '+' al principio) en este campo";
  } else if (dataForm.cellPhone.length < 11) {
    errors.cellPhone = "El número de teléfono debe tener al menos 10 dígitos";
  }
};

//Validar DNI
export const dniValidation = (dataForm, errors) => {
  if (!/^\d+$/.test(dataForm.dni)) {
    errors.dni = "Solo se permiten números en este campo";
  } else if (dataForm.dni.length !== 8) {
    errors.dni = "El número de documento debe tener 8 dígitos";
  } else {
    errors.dni = "";
  }
};

// // Uso en el componente
// handleValidation(dataForm, setErrors);
