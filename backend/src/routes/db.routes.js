import express from 'express';
import prisma from '../db.js';

const router = express.Router();

// Route de test de la connexion à la BDD
router.get('/db-health', async (req, res) => {
	try {
		// Test de connexion simple
		await prisma.$queryRaw`SELECT 1`;
		res.status(200).json({ message: 'OK' });
	} catch (error) {
		console.error('Erreur de connexion Prisma :', error);
		res.status(500).json({ status: '❌ Erreur de connexion', error: error.message });
	}
});

export default router;
