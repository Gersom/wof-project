const express = require("express")
const router = express.Router()
const controllers = require("../controllers/caregivers")

// route => /breeds/...

router.get("/", controllers.getAllCaregivers)

router.get("/:id", controllers.getCaregiver)

router.post("/", controllers.createCaregiver)

router.put("/:id", controllers.updateCaregiver)

router.delete("/:id", controllers.deleteCaregiver)

module.exports = router