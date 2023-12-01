const express = require("express")
const router = express.Router()
const controllers = require("../controllers/notifications")

// route => /notifications/...

router.get("/", controllers.getAllNotifications)

router.get("/:id", controllers.getNotification)

router.post("/", controllers.createNotification)

router.put("/", controllers.updateNotificationByUser)

router.put("/:id", controllers.updateNotification)

router.delete("/:id", controllers.deleteNotification)
module.exports = router
