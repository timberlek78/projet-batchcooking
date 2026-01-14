import api from '../api/api.js';

export function getIngredients() {
	return api.get('/ingredients');
}
