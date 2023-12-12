const express = require("express")
const router = express.Router()
const configurePaypal = require("../services/paypal/configure")
const detailsPaypal = require("../services/paypal/details")
const generateRandomCode = require("../utils/generateRandomCode")

router.post("/", async (req, res) => {
  try {
    const body = req.body
    const { 
      PostsModel, 
      CaregiversModel, 
      CaregiverTransactionsModel,
      NotificationsModel
    } = require('./../models/index')

    const postData = await PostsModel.findTransactionById(body?.postId)    
    const caregiver = await CaregiversModel.findCaregiver(body?.caregiverId)

    let transaction = postData?.transactions
    if (!transaction) throw Error("transactions error")
    if (transaction.length < 1) throw Error("not transactions")
    const len = transaction.length 
    transaction = transaction[len-1]
    
    const percentage = 5
    const originalAmount = transaction?.amount || 0
    const revenue = (percentage / 100) * originalAmount
    const roundedRevenue = revenue.toFixed(2)
    const productId = 'post0' + body?.postId + body?.petName + await generateRandomCode()

    const createCaregiverTransaction = async () => {
      return await CaregiverTransactionsModel.create({
        email: caregiver?.emailPaypal,
        productId,
        currencyCode: transaction.currencyCode,
        originalAmount: String(originalAmount),
        amountPaid: String(originalAmount - roundedRevenue),
        percentage,
        revenue: String(roundedRevenue),
        transactionId: transaction?.id,
        servicePostingId: body?.postId,
        caregiverId: body?.caregiverId
      })
    }

    const createNotification = async () => {
      await NotificationsModel.create({
        message: `Se realizó tu pago de: ${transaction.currencyCode} ${originalAmount - roundedRevenue}, como cuidador a la cuenta: ${caregiver?.emailPaypal}, para la mascota: ${body?.petName}, descuento por uso de la aplicación ${percentage}%`,
        status: false,
        action: '',
        userId: body?.userId
      })
    }

    // const payoutDetails = {
    const payoutDetails = detailsPaypal({
      amount: Number(originalAmount - roundedRevenue),
      currency: transaction.currencyCode, 
      note: 'WOF - Cuidado de mascota: ' + body?.petName, 
      email: caregiver?.emailPaypal,
      productId,
      emailSubject:'WOF - Cuidado de mascota: ' + body.petName
    })

    const paypalContructor = await configurePaypal()
    paypalContructor.payout.create(payoutDetails, async (error, payout) => {
      if (!error) {
        const careTransaction = await createCaregiverTransaction()
        await createNotification()
        res.status(200).json(careTransaction)
        // console.log('=> ya le pague al cuidador, ahora si me compras mis papas lays?')
      } else {
        // console.error("=> papi paso un error, no pude darle dinero al cuidador, te he fallado :'(")
        res.status(500).json(error.response)
      }
    });

  } catch (error) {
    return res.status(501).json(error.message)
  }
})

module.exports = router