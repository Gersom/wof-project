const express = require("express")
const router = express.Router()
const controllers = require("../controllers/owners")

// route => /breeds/...

router.get("/", controllers.getAllOwners)

router.get("/:id", controllers.getOwner)

router.get("/:id/hired-caregivers", controllers.getHiredCaregivers)

router.post("/", controllers.createOwner)

router.put("/:id", controllers.updateOwner)

router.delete("/:id", controllers.deleteOwner)

module.exports = router