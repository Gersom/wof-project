const express = require("express")
const router = express.Router()
const { 
  getItems, 
  getItemDetail, 
  createItem, 
  updateItem, 
  deleteItem
} = require("../handlers/items")



// route => /items/...

// READ ITEMS
router.get("/", getItems)

// DETAIL ITEM
router.get("/:id", getItemDetail)

// CREATE ITEM
router.post("/", createItem)

// UPDATE ITEM
router.put("/:id", updateItem)

// DELETE ITEM
router.delete("/:id", deleteItem)



module.exports = router