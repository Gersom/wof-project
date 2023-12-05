const express = require("express");
const router = express.Router();
const controllers = require("../controllers/verify_email");

// route => /verify_email/...


router.post("/", controllers.sendVerifyEmail);

router.put("/", controllers.verifyEmail);


module.exports = router;