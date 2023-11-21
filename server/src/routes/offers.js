const express = require("express")
const controllers = require("../controllers/offers");
const router = express.Router()

router.get("/offer/:id", controllers.getOffer)

router.get("/offers", controllers.getAllOffers)

module.exports= router