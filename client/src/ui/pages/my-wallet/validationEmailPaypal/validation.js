
function validation({emailPaypal}){
  const a = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
  const errors = {}

  if(!a.test(emailPaypal)) errors.emailPaypal = 'Debe ser un correo válido'

  return errors
}

export default validation;