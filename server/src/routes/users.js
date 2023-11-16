const express = require("express")
const router = express.Router()
const handlers = require("../handlers/users")

// route => /breeds/...

router.get("/", handlers.getAllUsers)

router.get("/:id", handlers.getUser)

router.post("/", handlers.createUser)

router.put("/:id", handlers.updateUser)

router.delete("/:id", handlers.deleteUser)

module.exports = router