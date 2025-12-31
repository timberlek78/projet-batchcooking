import request from 'supertest';
import express from 'express';
import recipesRoutes from '../src/routes/recipes.routes';

const app = express();
app.use(express.json());
app.use('/recipes', recipesRoutes);

describe('CRUD Recipes', () => {
	let createdRecipeId;
	const unique = Date.now();

	const baseRecipe = {
		recipe_name: 'Pates',
		recipe_difficult: 2,
		recipe_like_number: 35,
		recipe_preparation_time: 40,
		recipe_cooking_time: 20,
	};

	it('POST /recipes -> créer une recette', async () => {
		const res = await request(app).post('/recipes').send(baseRecipe);

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('recipe_id');
		expect(res.body.recipe_name).toBe(baseRecipe.recipe_name);

		createdRecipeId = res.body.recipe_id;
	});

	it('POST /recipes -> créer une recette (invalide)', async () => {
		let invalidRecipe = {
			recipe_name: 'Pates',
			recipe_difficult: 11,
			recipe_like_number: 35,
			recipe_preparation_time: 40,
			recipe_cooking_time: 20,
		};

		const res = await request(app).post('/recipes').send(invalidRecipe);

		expect(res.status).toBe(400);
	});

	it('GET /recipes -> liste', async () => {
		const res = await request(app).get('/recipes');

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
	});

	it('GET /recipes/:id -> recupère la recette', async () => {
		const res = await request(app).get(`/recipes/${createdRecipeId}`);

		expect(res.status).toBe(200);
		expect(res.body.recipe_id).toBe(createdRecipeId);
		expect(res.body.recipe_name).toBe(baseRecipe.recipe_name);
	});

	it('PUT /recipes/:id -> modifie nom de recette', async () => {
		const res = await request(app)
			.put(`/recipes/${createdRecipeId}`)
			.send({ recipe_name: 'Quiche' });

		expect(res.status).toBe(200);
		expect(res.body.recipe_name).toBe('Quiche');
	});

	it('PUT /recipes/:id -> modifie difficulté', async () => {
		const res = await request(app)
			.put(`/recipes/${createdRecipeId}`)
			.send({ recipe_difficult: 4 });

		expect(res.status).toBe(200);
		expect(res.body.recipe_difficult).toBe(4);
	});

	it('PUT /recipes/:id -> modifie difficulté (invaldide)', async () => {
		const res = await request(app)
			.put(`/recipes/${createdRecipeId}`)
			.send({ recipe_difficult: 10 });

		expect(res.status).toBe(400);
	});

	it('DELETE /recipes/:id -> supprime la recette', async () => {
		const res = await request(app).delete(`/recipes/${createdRecipeId}`);

		expect(res.status).toBe(200);
	});

	it('GET /recipes/:id -> recupère la recette (404)', async () => {
		console.log('IDD', createdRecipeId);
		const res = await request(app).get(`/recipes/${createdRecipeId}`);

		expect(res.status).toBe(404);
	});
});
