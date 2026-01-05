import request from 'supertest';
import express from 'express';

import recipesRoutes from '../src/routes/recipes.routes.js';
import stapesRoutes from '../src/routes/stapes.routes.js';

const app = express();
app.use(express.json());

// Mount routers
app.use('/recipes', recipesRoutes);
app.use('/stapes', stapesRoutes);

describe('CRUD Stapes', () => {
	let createdRecipeId;
	let createdStapeId;

	const unique = Date.now();

	const baseRecipe = {
		recipe_name: `Recipe_test_${unique}`,
		recipe_difficult: 2,
		recipe_like_number: 0,
		recipe_preparation_time: 10,
		recipe_cooking_time: 10,
	};

	beforeAll(async () => {
		// 1) Create a recipe for FK recipe_id
		const res = await request(app).post('/recipes').send(baseRecipe);

		expect([200, 201]).toContain(res.status);
		expect(res.body).toHaveProperty('recipe_id');

		createdRecipeId = res.body.recipe_id;
	});

	it('POST /stapes -> crée une étape (201)', async () => {
		const baseStape = {
			stape_number: 1,
			stape_desc: 'Faire bouillir de l’eau',
			recipe_id: createdRecipeId,
		};

		const res = await request(app).post('/stapes').send(baseStape);

		expect([200, 201]).toContain(res.status);
		expect(res.body).toHaveProperty('stape_id');
		expect(res.body.stape_number).toBe(baseStape.stape_number);
		expect(res.body.stape_desc).toBe(baseStape.stape_desc);
		expect(res.body.recipe_id).toBe(createdRecipeId);

		createdStapeId = res.body.stape_id;
	});

	it('GET /stapes/:id -> renvoie les étapes pour la recette id (200)', async () => {
		const res = await request(app).get(`/stapes/${createdRecipeId}`);

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
	});

	it('PUT /stapes/:id -> modifie l’étape (200)', async () => {
		const updatePayload = {
			stape_number: 2,
			stape_desc: 'Ajouter les pâtes',
		};

		const res = await request(app).put(`/stapes/${createdStapeId}`).send(updatePayload);

		expect(res.status).toBe(200);

		// Si tu renvoies l’objet modifié :
		expect(res.body.stape_id).toBe(createdStapeId);
		expect(res.body.stape_number).toBe(updatePayload.stape_number);
		expect(res.body.stape_desc).toBe(updatePayload.stape_desc);
	});

	it('POST /stapes -> refuse sans recipe_id (400)', async () => {
		const res = await request(app).post('/stapes').send({
			stape_number: 1,
			stape_desc: 'Sans recette',
			// recipe_id manquant
		});

		expect([400, 422]).toContain(res.status);
	});

	it('DELETE /stapes/:id -> supprime l’étape (200/204)', async () => {
		const res = await request(app).delete(`/stapes/${createdStapeId}`);

		expect([200, 204]).toContain(res.status);
	});

	it('GET /stapes/:id -> renvoie 404 après suppression', async () => {
		const res = await request(app).get(`/stapes/${createdStapeId}`);

		expect(res.status).toBe(404);
	});

	afterAll(async () => {
		// Cleanup: remove recipe (si ton API le permet)
		// Ça dépend de tes routes recipes.
		// Si tu as DELETE /recipes/:id :
		await request(app).delete(`/recipes/${createdRecipeId}`);
	});
});
