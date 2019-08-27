const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: 'Mike',
	email: 'test@afdasf.com',
	password: 'Peter123',
	tokens: [
		{
			token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
		}
	]
};

const setDatabase = async () => {
	await User.deleteMany();
	await new User(userOne).save();
};

module.exports = {
	userOne,
	userOneId,
	setDatabase
};
