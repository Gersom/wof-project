const express = require("express")
const router = express.Router()
const {CaregiverTransactionsModel} = require("./../models/index")

// const dataDefault = [
//   {
//     date: "2023-12-11 16:01:58.523-05",
//     currencyCode: "USD",
//     amountPaid: "19.00",
//     percentage: "5",
//     revenue: "1.00"
//   },
//   {
//     date: "2023-12-11 16:01:58.523-05",
//     currencyCode: "USD",
//     amountPaid: "95.00",
//     percentage: "5",
//     revenue: "5.00"
//   },
//   {
//     date: "2023-11-11 16:01:58.523-05",
//     currencyCode: "USD",
//     amountPaid: "19.00",
//     percentage: "5",
//     revenue: "1.00"
//   },
//   {
//     date: "2023-10-11 16:01:58.523-05",
//     currencyCode: "USD",
//     amountPaid: "19.00",
//     percentage: "5",
//     revenue: "1.00"
//   },
//   {
//     date: "2023-09-11 16:01:58.523-05",
//     currencyCode: "USD",
//     amountPaid: "40.00",
//     percentage: "5",
//     revenue: "10.00"
//   }
// ]

router.get("/", async (req, res) => {
  const careTransacs = await CaregiverTransactionsModel.findAllData()
  const careTransFormated = careTransacs.map(e=>{
    let data = {...e.toJSON()}
    data.date = data.createdAt
    return data
  })
  res.status(200).json(careTransFormated)
})

module.exports = router