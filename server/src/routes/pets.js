const express = require("express")
const router = express.Router()
const controllers = require("../controllers/pets")

// route => /pets/...

router.get("/", controllers.getAllPets)

router.get("/:id", controllers.getPet)

router.post("/", controllers.createPet)

router.put("/:id", controllers.updatePet)

router.delete("/:id", controllers.deletePet)

module.exports = router