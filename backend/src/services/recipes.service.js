import RecipesModels from '../models/recipes.models.js';
import IngredientModels from '../models/ingredient.models.js';
import StepesModels from '../models/stepes.models.js';

import prisma from '../db.js';

class RecipesServices {
	static async getIngredients(idRecipe) {
		const idsIngredientObjects = await RecipesModels.getIngredients(idRecipe);

		if (!idsIngredientObjects || idsIngredientObjects.length === 0) {
			return [];
		}

		const quantityMap = new Map(
			idsIngredientObjects.map(row => [
				row.ingredient_id,
				row.quantity
			])
		);

		const ingredientIds = idsIngredientObjects.map(row => row.ingredient_id);
		const ingredients = await IngredientModels.getIngredientById(ingredientIds);

		const result = ingredients.map(ing => ({
			...ing,
			quantity: quantityMap.get(ing.ingredient_id) ?? 0
		}));

		return result;
	}


	static async create(data) 
	{
		const parseRecipeBody = (body) =>{
			return {
				recipe_name: body.recipe_name,
				recipe_image : body.recipe_image,
				recipe_preparation_time: Number(body.recipe_preparation_time),
				recipe_cooking_time: Number(body.recipe_cooking_time),
				recipe_difficult: Number(body.recipe_difficult),
				recipe_nb_personne: Number(body.recipe_nb_personne),
				recipe_like_number: Number(body.recipe_like_number),
				stepes: JSON.parse(body.stepes),
				ingredients: JSON.parse(body.ingredients),
				recipe_user_id :  Number(body.user_id)
			};
		};

		data = parseRecipeBody(data);

		let { ingredients = [], stepes = [], ...recipeData } = data;

		return await prisma.$transaction(async (tx) => {

			const recipe = await RecipesModels.create(recipeData, tx);

			await Promise.all(
				ingredients.map((ing) =>
					RecipesModels.linkIngredientRecipe(
						recipe.recipe_id,
						ing.ingredient_id,
						Number(ing.quantity) ?? 0,
						tx
					)
				)
			);


			await Promise.all(
				stepes.map((stepe) =>{
					const data = {
						...stepe,
						recipe: { connect: { recipe_id: recipe.recipe_id } },
					}
					return StepesModels.create(data, tx)
				}
					
				)
			);

			return recipe;
		});
	};


	static async update(recipe_id, data) {
		if (!data || typeof data !== 'object') {
			throw new Error('Body invalide.');
		}

		if ('recipe_id' in data) {
			throw new Error("Impossible de modifier 'recipe_id'.");
		}

		const parseRecipeBody = (body) => {
			return {
				recipe_name: body.recipe_name,
				recipe_image: body.recipe_image[0],
				recipe_preparation_time: Number(body.recipe_preparation_time),
				recipe_cooking_time: Number(body.recipe_cooking_time),
				recipe_difficult: Number(body.recipe_difficult),
				recipe_nb_personne: Number(body.recipe_nb_personne),
				recipe_like_number: Number(body.recipe_like_number),
				stepes: JSON.parse(body.stepes),
				ingredients: JSON.parse(body.ingredients),
			};
		};

		data = parseRecipeBody(data);

		console.log("dataaa",data);
		let { ingredients = [], stepes = [], ...recipeData } = data;

		return await prisma.$transaction(async (tx) => {
			const recipe = await RecipesModels.update(recipe_id, recipeData, tx);

			await RecipesModels.deleteIngredientsByRecipeId(recipe_id, tx);
			await Promise.all(
				ingredients.map((ing) =>
					RecipesModels.linkIngredientRecipe(
						recipe_id,
						ing.ingredient_id,
						Number(ing.quantity) ?? 0,
						tx
					)
				)
			);

			await StepesModels.deleteByRecipeId(recipe_id, tx);
			await Promise.all(
				stepes.map((stepe) => {
					const { stepes_id, ...stepeData } = stepe;
					return StepesModels.create({
						...stepe,
						recipe_id: recipe_id,
					}, tx);
				})
			);

			return recipe;
		});
	}

	static async isLike(data)
	{
		return await RecipesModels.isLike(data.user_id, data.recipe_id);
	}

	static async likeRecipe(like) {
		const res = await RecipesModels.isLike(like.users_id, like.recipe_id);

		if (!res) {
			await RecipesModels.createLike(like.users_id, like.recipe_id);
			await RecipesModels.update(like.recipe_id, { recipe_like_number: { increment: 1 } });
		} else {
			const recipe = await RecipesModels.getById(like.recipe_id);
    
			await RecipesModels.deleteLike(like.users_id, like.recipe_id);
			
			if (recipe.recipe_like_number > 0) {
				await RecipesModels.update(like.recipe_id, { recipe_like_number: { decrement: 1 } });
			}
		}
	}

	static async delete(id)
	{
		const deleteStepes = await StepesModels.deleteByRecipeId(id);

		if(deleteStepes)
		{
			const delinkIngredient = await RecipesModels.deleteIngredientsByRecipeId(id);
			if(delinkIngredient)
			{
				return await RecipesModels.delete(id);
			}
		}
	}
}

export default RecipesServices;
