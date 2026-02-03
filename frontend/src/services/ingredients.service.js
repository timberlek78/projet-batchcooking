import api from '../api/api.js';

export function getIngredients() {
	return api.get('/ingredients');
}


export function create(data)
{
	return api.post('/ingredients',data);
}
