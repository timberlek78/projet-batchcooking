import api from '../api/api.js';

export class RecipeService {
	static async getRecipe() {
		return api.get(`/recipes`);
	}

	static async getRecipeId(id) {
		return api.get(`/recipes/${id}`);
	}

	static async getIngredients(recipe_id) {
		return api.get(`/recipes/ingredient/${recipe_id}`);
	}

	static async create(data) 
	{
		return api.post(`/recipes`, data);
	}
}

export default RecipeService;
