import prisma from '../db.js';

export default class StapesModels {
	static getAll() {
		return prisma.stape.findMany({
			orderBy: { stape_number: 'asc' },
		});
	}

	static getByRecipe(recipe_id) {
		return prisma.stape.findMany({
			where: { recipe_id },
		});
	}

	static create(data) {
		return prisma.stape.create({
			data,
		});
	}

	static update(stape_id, data) {
		return prisma.stape.update({
			where: { stape_id },
			data,
		});
	}

	static delete(stape_id) {
		return prisma.stape.delete({
			where: { stape_id },
		});
	}
}
