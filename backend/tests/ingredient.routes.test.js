import request from 'supertest';
import express from 'express';
import ingredientRoutes from '../src/routes/ingredient.routes';

const app = express();
app.use(express.json());
app.use('/ingredient', ingredientRoutes);

describe('CRUD Ingredient', () => {
	let ingredientsCreatedId;
	const unique = Date.now();

	const basicIngredient = {
		ingredient_name: 'I1',
		ingredient_unit: 'u1',
	};

	it('POST /ingredient -> créer un ingrédient', async () => {
		const res = await request(app).post('/ingredient').send(basicIngredient);

		console.log(res.body);

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('ingredient_id');
		expect(res.body.ingredient_name).toBe('I1');

		ingredientsCreatedId = res.body.ingredient_id;
	});

	it('POST /ingredient -> créer un ingredient (invalide)', async () => {
		let invalidIngredient = {
			ingredient_name: 12,
			ingredient_unit: 'u1',
		};

		const res = await request(app).post('/ingredient').send(invalidIngredient);

		expect(res.status).toBe(400);
	});

	it('GET /ingredient -> récuperer tous les ingrédients', async () => {
		const res = await request(app).get('/ingredient');

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
	});

	it('GET /ingredient/:id -> récupere un ingrédient', async () => {
		const res = await request(app).get(`/ingredient/${ingredientsCreatedId}`);

		expect(res.status).toBe(200);
		expect(res.body.ingredient_id).toBe(ingredientsCreatedId);
		expect(res.body.ingredient_name).toBe(basicIngredient.ingredient_name);
	});

	it('PUT /ingredient/:id -> modifie un ingrédient', async () => {
		const res = await request(app)
			.put(`/ingredient/${ingredientsCreatedId}`)
			.send({ ingredient_name: 'IM' });

		expect(res.status).toBe(200);
		expect(res.body.ingredient_name).toBe('IM');
	});

	it('PUT /ingredient/:id -> modifie nom (invaldide)', async () => {
		const res = await request(app)
			.put(`/ingredient/${ingredientsCreatedId}`)
			.send({ ingredient_name: 10 });

		expect(res.status).toBe(400);
	});

	it("DELETE /ingredient/:id -> supprime l'ingredient", async () => {
		const res = await request(app).delete(`/ingredient/${ingredientsCreatedId}`);

		expect(res.status).toBe(200);
	});

	it('GET /ingredient/:id -> recupère la recette (404)', async () => {
		const res = await request(app).get(`/ingredient/${ingredientsCreatedId}`);

		expect(res.status).toBe(404);
	});
});
