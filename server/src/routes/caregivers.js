const express = require("express")
const router = express.Router()
const controllers = require("../controllers/caregivers")

// route => /caregivers/...

router.get("/", controllers.getAllCaregivers)

router.get("/:id", controllers.getCaregiver)

router.get("/:id/cared-pets", controllers.getCaredPets)

router.get("/:id/wallet", controllers.getWallet)

router.post("/", controllers.createCaregiver)

router.put("/:id", controllers.updateCaregiver)

router.delete("/:id", controllers.deleteCaregiver)


module.exports = router