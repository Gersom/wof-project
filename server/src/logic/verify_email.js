const {
    UsersModel,
    VerifyEmailModel
} = require('../models');

const { createUser } = require('./users');

const postSendVerifyEmailLogic = async (data) => {
    const User = await UsersModel.findAllUsers();

    const alreadyExist = User.find((user) => user.email === data.email);

    if (alreadyExist) throw Error("Email already exist");

    const newVerifyEmail = await VerifyEmailModel.createVerifyEmail(data);

    return newVerifyEmail;
}

const verifyEmailLogic = async (data) => {
    const { email, code } = data;

    const verifyEmail = await VerifyEmailModel.findOneVerifyEmail({ email, code });

    if (!verifyEmail) throw Error("Verify email not found");


    return true;   
}



module.exports = {
    postSendVerifyEmailLogic,
    verifyEmailLogic
};