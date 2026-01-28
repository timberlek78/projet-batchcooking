import prisma from '../db.js';

export default class StepesModels {
	static getAll() {
		return prisma.stepes.findMany({
			orderBy: { stepes_number: 'asc' },
		});
	}

	static getByRecipe(recipe_id) {
		return prisma.stepes.findMany({
			where: { recipe_id },
		});
	}

	static create(data,tx = prisma) {
		return tx.stepes.create({
			data,
		});
	}

	static update(stepes_id, data) {
		return prisma.stepes.update({
			where: { stepes_id },
			data,
		});
	}

	static delete(stepes_id) {
		return prisma.stepes.delete({
			where: { stepes_id },
		});
	}
}
