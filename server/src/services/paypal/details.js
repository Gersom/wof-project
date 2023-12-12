
const detailsPaypal = ({
  amount= "0.00", 
  currency= 'USD', 
  note= '', 
  email= 'sb-gcbtn27208218@personal.example.com',
  productId='id03',
  emailSubject='Cuidado de mascota'
}) => {
  
  // Detalles del pago
  const resultJson = {
    sender_batch_header: {
      sender_batch_id: productId,
      email_subject: emailSubject
    },
    items: [
      {
        recipient_type: 'EMAIL',
        amount: {
          value: amount, // Monto del pago
          currency: currency // Moneda
        },
        note: note, //'Cuidado de mascota: PELUCHE',
        receiver: email // Correo electrónico del destinatario
      }
    ]
  }

  return resultJson
}

module.exports = detailsPaypal