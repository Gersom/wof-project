const express = require("express")
const router = express.Router()
const { CaregiversModel } = require("../models/index")
// route => /email-paypal/...

router.put("/", async (req,res) => {
    try {
        const { emailPaypal, caregiverId } = req.body;
        if(!emailPaypal || !caregiverId) throw Error("missing data");

        await CaregiversModel.updateData(caregiverId,{emailPaypal})

        res.status(200).json({success: "The email paypal has been changed successfully"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports = router