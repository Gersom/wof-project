const sendVerifyEmailErrorHandler = (err, req, res, next) => {
	console.error('Error in sendVerifyEmailErrorHandler:', err);

	console.log('err.name:', err.name);
	console.log('--------------->', err);

	console.log('err.message:', err.message);

	if (err.message === 'NotFoundError') {
		res
			.status(404)
			.json({ error: 'User not found in sendVerifyEmail operation.' });
	} else if (err.message === 'Email already exist') {
		res.status(404).json({ error: 'Email already exist  operation.' });
	} else {
		res
			.status(500)
			.json({ error: 'Internal server error while sending verify email.' });
	}
};

const verifyEmailErrorHandler = (err, req, res, next) => {
	console.error('Error in verifyEmailErrorHandler:', err);

	if (err.message === 'NotFoundError') {
		res.status(404).json({ error: 'User not found in verifyEmail operation.' });
	} else if (err.message === 'Email not found') {
		res
			.status(404)
			.json({ error: 'Email not found in sendVerifyEmail operation.' });
	} else if (err.message === 'Code is not valid') {
		res
			.status(404)
			.json({ error: 'Code is not valid in verifyEmail operation.' });
	} else {
		res
			.status(500)
			.json({ error: 'Internal server error while verifying email.' });
	}
};

module.exports = {
	sendVerifyEmailErrorHandler,
	verifyEmailErrorHandler,
};
