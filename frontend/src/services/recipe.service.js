import api from '../api/api.js';

export class RecipeService {
	static async getRecipe() {
		return api.get(`/recipes`);
	}

	static async getRecipeId(id) {
		return api.get(`/recipes/${id}`);
	}

	static async create(data) {
		return api.post(`/recipe`, data);
	}
}

export default RecipeService;
