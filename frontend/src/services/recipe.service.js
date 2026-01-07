import api from '../api/api.js';

export function getRecipe() {
	return api.get(`/recipes`);
}

export function getRecipeId(id) {
	return api.get(`/recipes/${id}`);
}

export function create(data) {
	return api.post(`/recipe`, data);
}
