const express = require("express")
const router = express.Router()
const controllers = require("../controllers/countries")

// route => /countries/...

router.get("/", controllers.getCountries)

module.exports = router