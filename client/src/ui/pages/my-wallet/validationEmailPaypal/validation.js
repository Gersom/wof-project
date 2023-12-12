
function validation({emailPaypal}){
  const a = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const errors = {}

  if(!a.test(emailPaypal)) errors.emailPaypal = 'Debe ser un correo válido'

  return errors
}

export default validation;