import request from 'supertest';
import express from 'express';

import usersRoutes from '../src/routes/users.routes.js';
import recipesRoutes from '../src/routes/recipes.routes.js';
import weeksRoutes from '../src/routes/weeks.routes.js';

const app = express();
app.use(express.json());

// Mount routers
app.use('/users', usersRoutes);
app.use('/recipes', recipesRoutes);
app.use('/weeks', weeksRoutes);

describe('CRUD Weeks', () => {
	let createdUserId;
	let createdRecipeId;
	let createdWeekId;

	const unique = Date.now();

	const baseUser = {
		user_username: `User_test_${unique}`,
		user_email: `user_test_${unique}@test.com`,
		user_password: 'password_test',
	};

	const baseRecipe = {
		recipe_name: `Recipe_test_${unique}`,
		recipe_difficult: 2,
		recipe_like_number: 0,
		recipe_preparation_time: 10,
		recipe_cooking_time: 10,
	};

	beforeAll(async () => {
		// 1) Create user for FK user_id
		const userRes = await request(app).post('/users').send(baseUser);

		expect([200, 201]).toContain(userRes.status);
		expect(userRes.body).toHaveProperty('user_id');

		createdUserId = userRes.body.user_id;

		// 2) Create recipe for FK recipe_id
		const recipeRes = await request(app).post('/recipes').send(baseRecipe);

		expect([200, 201]).toContain(recipeRes.status);
		expect(recipeRes.body).toHaveProperty('recipe_id');

		createdRecipeId = recipeRes.body.recipe_id;
	});

	it('POST /weeks -> crée une semaine (201)', async () => {
		// ⚠️ Ton modèle Week a week_id en @id, donc on doit l’envoyer
		createdWeekId = Number(unique);

		const baseWeek = {
			week_id: createdWeekId,
			week_start: new Date('2026-01-05T00:00:00.000Z'),
			week_end: new Date('2026-01-12T00:00:00.000Z'),
			user_id: createdUserId,
			recipe_id: createdRecipeId,
		};

		const res = await request(app).post('/weeks').send(baseWeek);

		expect([200, 201]).toContain(res.status);
		expect(res.body).toHaveProperty('week_id');
		expect(res.body.week_id).toBe(createdWeekId);
		expect(res.body.user_id).toBe(createdUserId);
		expect(res.body.recipe_id).toBe(createdRecipeId);
	});

	it('GET /weeks/:id -> renvoie la semaine (200)', async () => {
		const res = await request(app).get(`/weeks/${createdWeekId}`);

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('week_id');
		expect(res.body.week_id).toBe(createdWeekId);
	});

	it('PUT /weeks/:id -> modifie la semaine (200)', async () => {
		const updatePayload = {
			week_end: new Date('2026-01-13T00:00:00.000Z'),
		};

		const res = await request(app).put(`/weeks/${createdWeekId}`).send(updatePayload);

		expect(res.status).toBe(200);

		// Si ton API renvoie l'objet modifié :
		expect(res.body.week_id).toBe(createdWeekId);
	});

	it('POST /weeks -> refuse si champs manquants (400/422)', async () => {
		const res = await request(app)
			.post('/weeks')
			.send({
				week_id: Number(unique) + 1,
				// week_start manquant
				week_end: new Date('2026-01-12T00:00:00.000Z'),
				user_id: createdUserId,
				recipe_id: createdRecipeId,
			});

		expect([400, 422]).toContain(res.status);
	});

	it('DELETE /weeks/:id -> supprime la semaine (200/204)', async () => {
		const res = await request(app).delete(`/weeks/${createdWeekId}`);

		expect([200, 204]).toContain(res.status);
	});

	it('GET /weeks/:id -> renvoie 404 après suppression', async () => {
		const res = await request(app).get(`/weeks/${createdWeekId}`);

		expect(res.status).toBe(404);
	});

	afterAll(async () => {
		// Cleanup si tes routes le permettent
		await request(app).delete(`/recipes/${createdRecipeId}`);
		await request(app).delete(`/users/${createdUserId}`);
	});
});
