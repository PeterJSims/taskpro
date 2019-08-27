const request = require('supertest');
const app = require('../src/app');

test('Should signup a new user', async () => {
	await request(app)
		.post('/users')
		.send({
			name: 'P Sims',
			email: 'a@adfsaf.com',
			password: 'Peter123'
		})
		.expect(201);
});
