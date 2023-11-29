const express = require("express")
const router = express.Router()
const controllers = require("../controllers/countries")

// route => /countries/...

router.get("/", controllers.getCountries)

module.exports = router

// const {CountriesModel} = require("./../models/index")

// const express = require("express");
// const router = express.Router();

// router.get("/", async (req, res) => {
//   const countries = await CountriesModel.findAllData()
//   if (countries) {
//     res.status(200).json(countries)
//   }
//   else res.status(200).json({error: "Countries not found"})
 
// });
// module.exports = router