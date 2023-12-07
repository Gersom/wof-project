const getUsersStatsErrorhandler = (err, req, res, next) => {
	console.error('Error in getUsersStatsErrorhandler:', err);

	console.log('err.name:', err.name);
	console.log('--------------->', err);

	console.log('err.message:', err.message);

	if (err.message === 'NotFoundError') {
		res
			.status(404)
			.json({ error: 'User not found in getUsersStats operation.' });
	} else {
		res
			.status(500)
			.json({ error: 'Internal server error while gettin users stats.' });
	}
};

module.exports={
    getUsersStatsErrorhandler
}