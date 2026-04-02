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

	static async getStepe(recipe_id)
	{
		return api.get(`/stepes/${recipe_id}`);
	}

	static async create(data) {
		return api.post(`/recipes`, data);
	}

	static async createWithImage(formData) {

		return api.post(`/recipes`, formData, {
			headers: { 'Content-Type': undefined }, 
		});
	}

	static async setLike(data)
	{
		return api.post(`/recipes/like/`,data)
	}

	
	static async isLike(users_id, recipe_id)
	{
		return api.get(`/recipes/like/${users_id}/${recipe_id}`)
	}

	static getImage(filename) {
		if (!filename) return null;
		return `${api.defaults.baseURL}/uploads/recipes/${filename}`;
	}
}

export default RecipeService;
