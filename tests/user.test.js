const request = require('supertest');

const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setDatabase } = require('./fixtures/db');

beforeEach(setDatabase);

test('Should signup a new user', async () => {
	const response = await request(app)
		.post('/users')
		.send({
			name: 'P Sims',
			email: 'a@adfsaf.com',
			password: 'Peter123'
		})
		.expect(201);

	//Assert that the database was changed correctly
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	//Assertins about the resposne
	expect(response.body).toMatchObject({
		user: {
			name: 'P Sims'
		},
		token: user.tokens[0].token
	});
	expect(user.password).not.toBe('Peter12345');
});

test('Should login existing user', async () => {
	const response = await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password
		})
		.expect(200);
	const user = await User.findById(userOneId);
	expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should fail login', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: '33333333'
		})
		.expect(400);
});

test('Should get profile for user', async () => {
	await request(app).get('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
	await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for user', async () => {
	await request(app).delete('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200);
	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});

test('Should not delete unauthenticated user', async () => {
	await request(app).delete('/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
	await request(app)
		.post('/users/me/avatar')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.attach('avatar', 'tests/fixtures/profile-pic.jpg')
		.expect(200);
	const user = await User.findById(userOneId);
	//toEqual doesn't use === like toBe does. Remember that objects with all the same properties aren't actually equal!
	expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			name: 'Pete'
		})
		.expect(200);
	const user = await User.findById(userOneId);
	expect(user.name).toEqual('Pete');
});

test('Should not update invalid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			state: 'Virginia'
		})
		.expect(400);
});
