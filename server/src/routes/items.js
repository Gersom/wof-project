const express = require("express")
const router = express.Router()
const handlers = require("../handlers/items")

// route => /breeds/...

router.get("/", handlers.getAllItems)

router.get("/:id", handlers.getItem)

router.post("/", handlers.createItem)

router.put("/:id", handlers.updateItem)

router.delete("/:id", handlers.deleteItem)

module.exports = router