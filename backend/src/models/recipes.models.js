import prisma from '../db.js';

class RecipesModels {
	static async getAll() {
		return prisma.recipes.findMany();
	}

	static async getById(recipe_id) {
		return prisma.recipes.findUnique({ where: { recipe_id } });
	}

	static async getIdIngredient(recipe_id) {
		return prisma.recipesIngredient.findMany({
			select: { ingredient_id: true },
			where: { recipe_id: recipe_id },
		});
	}

	static async create(newRecipes,tx = prisma) {
		return tx.recipes.create({ data: newRecipes });
	}

	static async linkIngredientRecipe(recipe_id, ingredient_id, quantity, tx = prisma) {
		return await tx.recipesIngredient.create({
			data: {
				quantity,
				recipe: { connect: { recipe_id } },
				ingredient: { connect: { ingredient_id } },
			},
		});
	}
	
	static async update(recipe_id, data) {
		return prisma.recipes.update({ where: { recipe_id }, data });
	}

	static async delete(recipe_id) {
		return prisma.recipes.delete({ where: { recipe_id } });
	}
}

export default RecipesModels;
