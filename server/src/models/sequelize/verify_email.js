const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/dbConnect/engines/postgresql');
const addMethods = require('../utils/addStaticMethods');
const { v4: uuidv4 } = require('uuid');

const name = 'verify_email';
const config = {
	timestamps: true, // createAt, updateAt
	freezeTableName: true,
};

const schema = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	code: {
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: () => uuidv4(),
	},
	verified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
};

const VerifyEmailModel = sequelize.define(name, schema, config);

// add static methods (functions) to model

addMethods(VerifyEmailModel);

VerifyEmailModel['createVerifyEmail'] = async (data) => {
	const { email } = data;

	if (!email) throw Error('Email is required');

	await VerifyEmailModel.destroy({
		where: {
			email,
		},
	});

	const newVerifyEmail = await VerifyEmailModel.create(data);

	return newVerifyEmail;
};

VerifyEmailModel['findOneVerifyEmail'] = async (data) => {
	const { email, code } = data;

	const verifyEmail = await VerifyEmailModel.findOne({
		where: {
			email,
		},
	});

	if (!verifyEmail) throw Error('Email not found');

	if (verifyEmail.code !== code) throw Error('Code is not valid');

	verifyEmail.verified = true;
	VerifyEmailModel.destroy({
		where: {
			email,
		},
	});
	return verifyEmail;
};

module.exports = VerifyEmailModel;
