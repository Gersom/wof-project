const express = require("express");
const router = express.Router();
const controllers = require("../controllers/transactions");

// route => /breeds/...

router.get("/", controllers.getAllTransactions);

router.post("/", controllers.createTransaction);

module.exports = router;
