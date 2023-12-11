const express = require("express")
const router = express.Router()
const controllers = require("../controllers/admin")

// route => /breeds/...

router.get("/users-stats", controllers.getUserStats)

router.get("/users-info", controllers.getUsersInfo)

router.put("/delete-user/:id", controllers.deleteUser);

router.put("/restore-user/:id", controllers.restoreUser);

module.exports = router
