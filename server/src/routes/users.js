const express = require("express");
const router = express.Router();
const controllers = require("../controllers/users");

// route => /breeds/...

router.get("/", controllers.getAllUsers);

router.get("/:id", controllers.getUser);

router.get("/email/:email", controllers.existUserWhitEmail);

router.post("/", controllers.createUser);

router.put("/:id", controllers.updateUser);

router.delete("/:id", controllers.deleteUser);

router.post("/login", controllers.loginUser);

router.post("/:id/new-role", controllers.newRole);

module.exports = router;
