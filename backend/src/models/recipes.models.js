import prisma from '../db.js';

class RecipesModels {
	static async getAll() {
		return prisma.recipes.findMany();
	}

	static async getById(recipe_id) {
		return prisma.recipes.findUnique({ where: { recipe_id } });
	}

	static async getByUserId(user_id) {
		return prisma.recipes.findMany({ where: { recipe_user_id : user_id } });
	}

	static async getIngredients(recipe_id) {
		return prisma.recipesIngredient.findMany(
		{
			select: { ingredient_id: true, quantity : true },
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

	static deleteIngredientsByRecipeId(recipe_id, tx = prisma) {
		return tx.recipesIngredient.deleteMany({
			where: { recipe_id },
		});
	}
		
	static async update(recipe_id, data) {
		return prisma.recipes.update({ where: { recipe_id }, data });
	}

	static async delete(recipe_id) {
		return prisma.recipes.delete({ where: { recipe_id } });
	}

	static async isLike(user_id, recipe_id) {
		return prisma.userLike.findUnique({
			where: {
				user_id_recipe_id: {
					user_id: Number(user_id),
					recipe_id: Number(recipe_id)
				}
			}
		})
	}

	static async createLike(user_id, recipe_id)
	{
		 return prisma.userLike.create({
			data: {
				user_id: Number(user_id),
				recipe_id: Number(recipe_id),
				created_at: new Date()
			}
		})
	}

	static async deleteLike(user_id, recipe_id)
	{
		return prisma.userLike.delete({
			where: {
				user_id_recipe_id: {
					user_id: parseInt(user_id),
					recipe_id: parseInt(recipe_id)
				}
			}
		})
	}
}

export default RecipesModels;
