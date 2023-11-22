const express = require("express")
const controllers = require("../controllers/offers");
const router = express.Router()

router.get("/", controllers.getAllOffers)

router.get("/:id", controllers.getOffer)

router.post("/", controllers.postOffer )

module.exports= router