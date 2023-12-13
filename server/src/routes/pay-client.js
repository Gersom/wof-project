const express = require("express")
const router = express.Router()
const configurePaypal = require("../services/paypal/configure")
const detailsPaypal = require("../services/paypal/details")
const generateRandomCode = require("../utils/generateRandomCode")
const calculatePercentage = require("../utils/calculatePercentage")

router.post("/", async (req, res) => {
  try {
    const body = req.body
    const { 
      PostsModel, 
      CaregiversModel, 
      CaregiverTransactionsModel,
      NotificationsModel,
    } = require('./../models/index')

    const postData = await PostsModel.findTransactionById(body?.postId)    
    const caregiver = await CaregiversModel.findCaregiver(body?.caregiverId)

    let transaction = postData?.transactions
    if (!transaction) throw Error("transactions error")
    if (transaction.length < 1) throw Error("not transactions")
    const len = transaction.length 
    transaction = transaction[len-1]

    const productId = 'post0' + body?.postId + body?.petName + await generateRandomCode()
    const {
      brutoAmount, descuentoAmount, netoAmount, percentage
    } = calculatePercentage(Number(transaction.amount))
    
    const createCaregiverTransaction = async () => {
      return await CaregiverTransactionsModel.create({
        email: caregiver?.emailPaypal,
        productId,
        currencyCode: transaction.currencyCode,
        originalAmount: String(brutoAmount),
        amountPaid: String(netoAmount),
        percentage: String(percentage),
        revenue: String(descuentoAmount),
        transactionId: transaction?.id,
        servicePostingId: body?.postId,
        caregiverId: body?.caregiverId
      })
    }
    
    // const updateReceivedBalance = async () => {
    //   const caregiverTransactions = await CaregiverTransactionsModel.findAll({where:{caregiverId:body.caregiverId}})
    //   let totalRecievedBalance = 0
    //   caregiverTransactions.map(caretr => {
    //     totalRecievedBalance += Number(d.amountPaid)
    //     return caretr
    //   })

    //   await CaregiversModel.updateData(body.caregiverId,{recievedBalance: totalRecievedBalance})
    //   updateDueBalance(totalRecievedBalance)
    // }

    // const updateDueBalance = async (asd) => {
    //   const transactions = await TransactionsModel.findAll({
    //     where: { caregiverId: body.caregiverId, id: {[Op.not]: transaction.id} },
    //     attributes: ["amount"],
    //   })
    //   let totalDueBalance = 0;
    //   transactions.map(d => {
    //     const originalA = Number(d.amount)
    //     const revenueC = (percentage / 100) * originalA
    //     const roundedR = revenueC.toFixed(2)
    //     totalDueBalance += originalA - roundedR
    //     return d
    //   })
    //   return await CaregiversModel.updateData(body.caregiverId, { dueBalance: totalDueBalance - asd })
    // }

    const createNotification = async () => {
      await NotificationsModel.create({
        message: `Se realizó tu pago de: ${transaction.currencyCode} ${netoAmount}, como cuidador a la cuenta: ${caregiver?.emailPaypal}, para la mascota: ${body?.petName}, descuento por uso de la aplicación ${percentage}%`,
        status: false,
        action: '',
        userId: body?.userId
      })
    }

    const payoutDetails = detailsPaypal({
      amount: Number(netoAmount),
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
        // await updateReceivedBalance()
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