const express = require("express")
const router = express.Router()
const controllers = require("../controllers/species")

// route => /species/...

router.get("/", controllers.getSpecies)

module.exports = router

