const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
  res.status(200).send([
    {
      date: "2023-12-11 16:01:58.523-05",
      currencyCode: "USD",
      amount: "19.00",
      percentage: "5",
      revenue: "1.00"
    },
    {
      date: "2023-12-11 16:01:58.523-05",
      currencyCode: "USD",
      amount: "95.00",
      percentage: "5",
      revenue: "5.00"
    },
    {
      date: "2023-11-11 16:01:58.523-05",
      currencyCode: "USD",
      amount: "19.00",
      percentage: "5",
      revenue: "1.00"
    },
    {
      date: "2023-10-11 16:01:58.523-05",
      currencyCode: "USD",
      amount: "19.00",
      percentage: "5",
      revenue: "1.00"
    },
    {
      date: "2023-09-11 16:01:58.523-05",
      currencyCode: "USD",
      amount: "40.00",
      percentage: "5",
      revenue: "10.00"
    }
  ])
})

module.exports = router