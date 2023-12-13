const express = require("express")
const calculatePercentage = require("../utils/calculatePercentage")
const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const {caregiverId} = req.query
    const {
      CaregiverTransactionsModel, TransactionsModel, CaregiversModel
    } = require('./../models/index')

    const transactions = await CaregiverTransactionsModel.findMyWallet(caregiverId)
    let amountWithdrawn = 0
    let temporal = []

    const clients = await transactions.map((tra) => {
      tra = tra.get({ plain: true })
      const { servicePosting, ...traClean } = tra

      amountWithdrawn += Number(traClean.amountPaid)
      temporal.push(tra?.servicePosting?.id)
      return {
        ...traClean,
        postStatus: tra?.servicePosting?.status,
        petName: tra?.servicePosting?.pet?.name,
        specieName: tra?.servicePosting?.pet?.species?.name,
        specieIcon: tra?.servicePosting?.pet?.species?.icon,
        name: tra?.servicePosting?.owner?.user?.name,
        profilePicture: tra?.servicePosting?.owner?.user?.profilePicture
      }
    })

    const pepe = await TransactionsModel.findAll({
      where: {
        caregiverId
      }
    })
    let sumAmount = 0
    pepe.map((t) => {
      t = t.get({ plain: true })
      const {
        netoAmount
      } = calculatePercentage(Number(t.amount))
      sumAmount += netoAmount
    })
    
    let care = await CaregiversModel.findDataById(caregiverId)
    care = care.get({ plain: true })
    return res.status(200).json({
      clients, 
      totalClients: clients.length, 

      moneyGenerated: sumAmount,
      moneyWithdrawn: amountWithdrawn,
      moneyToWithdraw: sumAmount - amountWithdrawn,
      emailPaypal: care.emailPaypal
    })
  } catch (error) {
    return res.status(501).json(error.message)
  }
})

module.exports = router