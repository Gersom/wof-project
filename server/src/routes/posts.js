const { PostsModel } = require('./../models/index');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const caregiverId = req.query.caregiverId;
	if (caregiverId) {
		const posts = await PostsModel.findByCaregiverId(caregiverId);
		if (posts) {
			let postsFormated = posts;
			postsFormated = postsFormated.map((post) => {
				post = post.toJSON();
				return {
					...post,
					pet: {
						id: post?.pet?.id,
						name: post?.pet?.name,
						imageUrl: post?.pet?.petsImages[0]?.imageUrl,
					},
				};
			});
			res.status(200).json(postsFormated);
		} else res.status(403).json({ error: 'Posts not found' });
	} else {
		const countries = await PostsModel.findAllData();
		if (countries) {
			res.status(200).json(countries);
		} else res.status(200).json({ error: 'Posts not found' });
	}
});

router.post('/', async (req, res) => {
	const post = await PostsModel.create(req.body);
	if (post) {
		res.status(200).json(post);
	} else res.status(200).json({ error: 'Posts not found' });
});

router.put('/:id', async (req, res) => {
	const postId = req.params.id;
	const post = await PostsModel.updateData(postId, req.body);
	if (post) {
		res.status(200).json(post);
	} else res.status(200).json({ error: 'Posts not found' });
});

router.put('/', async (req, res) => {
	const id = req.query.postId;
	const { ownerVerified, caregiverVerified } = req.body;

	await PostsModel.updateData(id, { ownerVerified, caregiverVerified });

	const post = await PostsModel.findDataById(id);

	let message = {message: 'Post verified', doubleVerified: false};

	if (post.dataValues.caregiverVerified && post.dataValues.ownerVerified) {
		 await PostsModel.updateData(id, { status: 'completed' });
		message = {message: 'Post verified', doubleVerified: true};
	}
	if (post) {
		res.status(200).json(message);
	} else res.status(200).json({ error: 'Posts not found' });
});

module.exports = router;
