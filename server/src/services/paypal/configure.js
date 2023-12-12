require('dotenv').config()
const clientId = process.env.PAYPAL_CLIENT_ID
const secretKey = process.env.PAYPAL_SECRET
const paypal = require('paypal-rest-sdk');

const configurePaypal = async () => {
  // Configurar las credenciales de PayPal
  await paypal.configure({
    'mode': 'sandbox', // 'sandbox' para pruebas, 'live' para producción
    'client_id': clientId,
    'client_secret': secretKey
  });
  return paypal
}

module.exports = configurePaypal