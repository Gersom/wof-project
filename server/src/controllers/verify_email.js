const ErrorHandler = require('../handlers/verify_email');
const { postSendVerifyEmailLogic, verifyEmailLogic} = require('../logic/verify_email');

const sendVerifyMail = require('../config/mailing/sendVerifyMail');

const catchedAsync = require('../utils/catchedAsync');

// READ ITEMS

// CREATE ITEM

const sendVerifyEmail = catchedAsync(async (req, res) => {
	const newVerifyEmail = await postSendVerifyEmailLogic(req.body);
	const { email , code} = await newVerifyEmail;
	await sendVerifyMail(email, code);

	res.status(200).json({ message: 'Email sent' });

}, ErrorHandler.sendVerifyEmailErrorHandler);

const verifyEmail = catchedAsync(async (req, res) => {
	
	const verifyEmail = await verifyEmailLogic(req.body);

	res.status(200).json({verify : verifyEmail.verified});


}, ErrorHandler.verifyEmailErrorHandler);


module.exports = {
	sendVerifyEmail,
	verifyEmail,
};
