import prisma from '../db.js';

class IngredientModels {
	static async getAll() {
		return prisma.ingredient.findMany();
	}

	static async getById(ingredient_id) {
		return prisma.ingredient.findUnique({ where: { ingredient_id } });
	}

	static async create(ingredient) {
		return prisma.ingredient.create({ data: ingredient });
	}

	static async update(ingredient_id, data) {
		return prisma.ingredient.update({ where: { ingredient_id }, data });
	}

	static async delete(ingredient_id) {
		return prisma.ingredient.delete({ where: { ingredient_id } });
	}
}

export default IngredientModels;
