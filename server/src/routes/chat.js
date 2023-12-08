const { ChatModel } = require('../models');
const {
	MessagesChatModel,
	CaregiversModel,
	OwnersModel,
} = require('../models');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	res.status(200).json({ message: 'chat' });
});

router.post('/', async (req, res) => {
	const { caregiverId, ownerId } = req.body;
	if (!caregiverId || !ownerId)
		return res.status(405).json({ error: 'need caregiverId and ownerId' });

	const caregiver = await CaregiversModel.findCaregiver(caregiverId);
	if (!caregiver) return res.status(405).json({ error: 'caregiver not found' });

	const owner = await OwnersModel.findOwner(ownerId);
	if (!owner) return res.status(405).json({ error: 'owner not found' });

	const chatExist = await ChatModel.findOne({
		where: {
			caregiverId: caregiverId,
			ownerId: ownerId,
		},
	});

	if (chatExist) {
		await ChatModel.updateData(chatExist.dataValues.id, {petsOnCare : chatExist.dataValues.petsOnCare + 1});
		return  res.status(202).json({ message: 'chat update', chat: chatExist })
	}

	const chat = await ChatModel.create({
		caregiverId : caregiverId,
		ownerId: ownerId,
		ownerName: owner?.user?.name,
		caregiverName: caregiver?.user?.name,
		ownerAvatar: owner?.user?.profilePicture,
		caregiverAvatar: caregiver?.user?.profilePicture,
		petsOnCare: 1
	});

	if (!chat) return res.status(405).json({ error: 'chat not created' });

	res.status(200).json({ message: 'chat created', chat: chat });
});

router.delete('/', async (req, res) => {
	const { caregiverId, ownerId } = req.body;
	if (!caregiverId || !ownerId)
		return res.status(405).json({ error: 'need caregiverId and ownerId' });

	const chat = await ChatModel.destroy({ where: { caregiverId, ownerId } });

	if (!chat) return res.status(405).json({ error: 'chat not deleted' });

	res.status(200).json({ message: 'chat deleted' });
});

router.get('/caregiver/:caregiverId', async (req, res) => {
	const { caregiverId } = req.params;
	if (!caregiverId) return res.status(405).json({ error: 'need caregiverId' });

	const chats = await ChatModel.getAllMessagesByCaregiverId(caregiverId);

	return res.status(200).json({ message: 'chats', chats });
});

router.get('/owner/:ownerId', async (req, res) => {
	const { ownerId } = req.params;
	if (!ownerId) return res.status(405).json({ error: 'need ownerId' });

	const chats = await ChatModel.getAllMessagesByOwnerId(ownerId);

	return res.status(200).json({ message: 'chats', chats });
});

module.exports = router;
