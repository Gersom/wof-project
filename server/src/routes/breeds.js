const express = require("express")
const router = express.Router()
const controllers = require("../controllers/breeds")

// route => /breeds/...

router.get("/", controllers.getBreeds)

module.exports = router
