const sendVerifyEmailErrorHandler = (err, req, res, next) => {
	console.error('Error in sendVerifyEmailErrorHandler:', err);

	if (err.name === 'NotFoundError') {
		res
			.status(404)
			.json({ error: 'User not found in sendVerifyEmail operation.' });
	} else if (err.name === 'Email already exist') {
		res
			.status(404)
			.json({ error: 'Email already exist in sendVerifyEmail operation.' });
	} else {
		res
			.status(500)
			.json({ error: 'Internal server error while sending verify email.' });
	}
};

const verifyEmailErrorHandler = (err, req, res, next) => {
	console.error('Error in verifyEmailErrorHandler:', err);

	if (err.name === 'NotFoundError') {
		res.status(404).json({ error: 'User not found in verifyEmail operation.' });
	} else if (err.name === 'Email not found') {
		res
			.status(404)
			.json({ error: 'Email not found in sendVerifyEmail operation.' });
	} else if (err.name === 'Code is not valid') {
		res
			.status(404)
			.json({ error: 'Code is not valid in verifyEmail operation.' });
	} else {
		res
			.status(500)
			.json({ error: 'Internal server error while verifying email.' });
	}
};
