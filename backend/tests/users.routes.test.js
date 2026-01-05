import request from 'supertest';
import express from 'express';
import usersRoutes from '../src/routes/users.routes.js';

const app = express();
app.use(express.json());
app.use('/users', usersRoutes);

describe('CRUD Users', () => {
	let createdUserId;
	const unique = Date.now();

	const baseUser = {
		username: `testuser_${unique}`,
		email: `test_${unique}@mail.com`,
		password: 'password1234',
	};

	it('POST /users -> crée un user (201)', async () => {
		const res = await request(app).post('/users').send(baseUser);

		// idéal = 201
		expect(res.status).toBe(201);

		expect(res.body).toHaveProperty('user_id');
		expect(res.body.username).toBe(baseUser.username);
		expect(res.body.email).toBe(baseUser.email);

		// recommandé: ne pas renvoyer le password hashé
		expect(res.body).not.toHaveProperty('password');

		createdUserId = res.body.user_id;
	});

	it('GET /users -> liste (200)', async () => {
		const res = await request(app).get('/users');

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
	});

	it('GET /users/:id -> récupère le user (200)', async () => {
		const res = await request(app).get(`/users/${createdUserId}`);

		expect(res.status).toBe(200);
		expect(res.body.user_id).toBe(createdUserId);
		expect(res.body.email).toBe(baseUser.email);
		expect(res.body).not.toHaveProperty('password');
	});

	it('PUT /users/:id -> modifie username (200)', async () => {
		const res = await request(app)
			.put(`/users/${createdUserId}`)
			.send({ username: `nvUsername_${unique}` });

		expect(res.status).toBe(200);
		expect(res.body.username).toBe(`nvUsername_${unique}`);
	});

	it('PUT /users/:id -> modifie email (200)', async () => {
		const res = await request(app)
			.put(`/users/${createdUserId}`)
			.send({ email: `test_${unique}_2@mail.com` });

		expect(res.status).toBe(200);
		expect(res.body.email).toBe(`test_${unique}_2@mail.com`);
	});

	it('DELETE /users/:id -> supprime (200/204)', async () => {
		const res = await request(app).delete(`/users/${createdUserId}`);

		expect([200, 204]).toContain(res.status);
	});

	it('GET /users/:id -> renvoie 404 après suppression', async () => {
		const res = await request(app).get(`/users/${createdUserId}`);
		expect(res.status).toBe(404);
	});
});
