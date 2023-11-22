const express = require("express");
const router = express.Router();
const controllers = require("../controllers/users");

// route => /breeds/...

router.get("/", controllers.getAllUsers);

router.get("/:id", controllers.getUser);

router.post("/", controllers.createUser);

router.put("/:id", controllers.updateUser);

router.delete("/:id", controllers.deleteUser);

module.exports = router;
