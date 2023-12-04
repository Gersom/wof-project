export const handleValidation = (dataForm, setErrors) => {
  const errors = {};

  confirmPasswordValidation(dataForm, errors);
  passwordValidation(dataForm, errors);

  setErrors(errors);
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
