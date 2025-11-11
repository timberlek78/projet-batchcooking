import prisma from '../src/db.js';

describe('Test de la connexion Prisma', () => {
	it('doit se connecter et se déconnecter sans erreur', async () => {
		await expect(prisma.$connect()).resolves.not.toThrow();
		await prisma.$disconnect();
	});
});
