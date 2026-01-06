import prisma from '../db.js';

class RecipesModels {
	static async getAll() {
		return prisma.recipes.findMany();
	}

	static async getById(recipe_id) {
		return prisma.recipes.findUnique({ where: { recipe_id } });
	}

	static async create(newRecipes) {
		return prisma.recipes.create({ data: newRecipes });
	}

	static async update(recipe_id, data) {
		return prisma.recipes.update({ where: { recipe_id }, data });
	}

	static async delete(recipe_id) {
		return prisma.recipes.delete({ where: { recipe_id } });
	}
}

export default RecipesModels;
