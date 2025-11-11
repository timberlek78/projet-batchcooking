import request from 'supertest';
import express from 'express';
import dbRoutes from '../src/routes/dbRoutes.js';

const app = express();
app.use('/db', dbRoutes);

describe('Test de la route /db/db-health', () => {
	it('renvoie un statut 200 et un message de succès', async () => {
		const res = await request(app).get('/db/db-health');
		expect(res.status).toBe(200);
		expect(res.body.message).toContain('OK');
	});
});
