const {
    UsersModel,
    VerifyEmailModel
} = require('../models');

const { createUser } = require('./users');

const postSendVerifyEmailLogic = async (data) => {
    
    const User = await UsersModel.findOneData('email', data.email);


    if (User) throw Error("Email already exist");

    const newVerifyEmail = await VerifyEmailModel.createVerifyEmail(data);

    return newVerifyEmail;
}

const verifyEmailLogic = async (data) => {
    const { email, code } = data;

    const verifyEmail = await VerifyEmailModel.findOneVerifyEmail({ email, code });

    if (!verifyEmail) throw Error("Verify email not found");

    await VerifyEmailModel

    return verifyEmail;   
}



module.exports = {
    postSendVerifyEmailLogic,
    verifyEmailLogic
};