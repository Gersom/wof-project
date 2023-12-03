export const emailValidation = (email) => {
  if(email ==='') return { ok: false, msg: ''}

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!regexEmail.test(email)) return {
    ok: false, 
    msg: '❌ No es un email válido'
  }

  if(email.length > 35) return {
    ok: false,
    msg: '❌ El email no debe tener más de 35 caracteres'
  }

  return { ok: true, msg: '✅ Correo electrónico valido' }
}

export const passValidation = (password) => {
  if(password ==='') return { ok: false, msg: ''}

  const regexNumber = /\d/.test(password);
  if (!regexNumber) return {
    ok: false, 
    msg: '❌ La contraseña tiene que tener al menos un número'
  }

  if (/\s/.test(password)) return {
    ok: false, 
    msg: '❌ La contraseña no puede tener espacios'
  }

  if(password.length<6 || password.length>10) return {
    ok: false, 
    msg: '❌ La contraseña tiene que tener una longitud entre 6 y 10 caracteres'
  }

  return { ok: true, msg: '✅ Contraseña valida' }
}

export const nameValidation = (name) => {
  if(name ==='') return { ok: false, msg: ''}

  if(name.length<3) return {
    ok: false, 
    msg: '❌ El nombre debe tener al menos 3 caracteres'
  }

  return { ok: true, msg: '✅ Nombre valida' }
}