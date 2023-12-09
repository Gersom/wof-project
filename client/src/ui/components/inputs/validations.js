export const emailValidation = (value) => {
  if (value === '') return { char: "", state: null, message: "" }

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if(!regexEmail.test(value)) return {
    state: "error", char: "❌",
    message: 'Ingrese un correo electrónico válido'
  }
  else return {
    state: "validated", char: "✅",
    message: 'Correo electrónico válido'
  }
}

export const passwordValidation = (value) => {
  if (value === '') return { char: "", state: null, message: "" }

  if (value.length < 6) return {
    state: "error", char: "❌",
    message: "La contraseña debe tener al menos 6 dígitos"
  }
  else if (!/\d/.test(value)) return {
    state: "error", char: "❌",
    message: 'La contraseña debe contener al menos un número'
  }
  else if (/\s/.test(value)) return {
    state: "error", char: "❌", 
    message: 'La contraseña no puede tener espacios'
  }
  else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return {
    state: "error", char: "❌",
    message: "La contraseña debe contener al menos un carácter especial"
  }
  else return {
    state: "validated", char: "✅",
    message: 'Contraseña válida'
  }
}

export const nameValidation = (value) => {
  if (value === '') return { char: "", state: null, message: "" }

  if (value.length < 3) return {
    state: "error", char: "❌",
    message: 'Debe tener al menos 3 caracteres'
  }
  else if (value.length > 30) return {
    state: "error", char: "❌",
    message: 'No debe tener más de 30 caracteres'
  }
  else return {
    state: "validated", char: "✅",
    message: 'El Nombre es válido'
  }
}

export const lastNameValidation = (value) => {
  if (value === '') return { char: "", state: null, message: "" }

  if (value.length < 4) return {
    state: "error", char: "❌",
    message: 'Debe contener al menos 4 caracteres'
  }
  else if (value.length > 40) return {
    state: "error", char: "❌",
    message: 'No puede superar los 40 caracteres'
  }
  else return {
    state: "validated", char: "✅",
    message: 'Los apellidos son correcto'
  }
}