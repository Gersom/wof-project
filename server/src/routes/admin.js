const express = require("express")
const router = express.Router()
const controllers = require("../controllers/admin")

// route => /breeds/...

router.get("/get-users-stats", controllers.getUserStats)

module.exports = router
