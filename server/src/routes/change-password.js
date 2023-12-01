const express = require("express")
const router = express.Router()
const { UsersModel, NotificationsModel } = require("../models");
const { changePassword } = require("../data/notifications/index");
const bcrypt = require("bcrypt");

// route => /change-password/...

router.put("/", async (req,res) => {
    try {
        const { newPassword, newPasswordRepeat, userId } = req.body;
        if(!newPassword || !newPasswordRepeat || !userId) throw Error("missing data");
        if(newPassword !== newPasswordRepeat) throw Error("passwords must be the same")
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(req.body.newPassword, saltRounds);
      
        await UsersModel.updateData(userId,{password:passwordHash})
        await NotificationsModel.create({...changePassword,userId,})

        res.status(200).json({success: "The password has been changed successfully"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports = router