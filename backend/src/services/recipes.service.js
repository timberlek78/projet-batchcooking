import RecipesModels from '../models/recipes.models.js';

class RecipesServices {
	static async create(data) {
		if (data.recipe_difficult < 1 || data.recipe_difficult > 5)
			throw new Error('Difficult level invalide');

		return RecipesModels.create(data);
	}

	static async update(recipe_id, data) {
		if (!data || typeof data !== 'object') {
			throw new Error('Body invalide.');
		}

		// Interdit de modifier recipe_id
		if ('recipe_id' in data) {
			throw new Error("Impossible de modifier 'recipe_id'.");
		}

		// Whitelist : champs modifiables
		const allowed = [
			'recipe_name',
			'recipe_difficult',
			'recipe_preparation_time',
			'recipe_cooking_time',
			'recipe_like_number',
		];

		const cleanData = {};
		for (const key of allowed) {
			if (data[key] !== undefined) {
				cleanData[key] = data[key];
			}
		}

		if (Object.keys(cleanData).length === 0) {
			throw new Error('Aucun champ valide à mettre à jour.');
		}

		// Validations simples (optionnel mais recommandé)
		if (
			cleanData.recipe_difficult !== undefined &&
			(!Number.isInteger(cleanData.recipe_difficult) ||
				cleanData.recipe_difficult < 1 ||
				cleanData.recipe_difficult > 5)
		) {
			throw new Error('recipe_difficult doit être un entier entre 1 et 5.');
		}

		if (
			cleanData.recipe_preparation_time !== undefined &&
			(!Number.isInteger(cleanData.recipe_preparation_time) ||
				cleanData.recipe_preparation_time < 0)
		) {
			throw new Error('recipe_preparation_time doit être un entier >= 0.');
		}

		if (
			cleanData.recipe_cooking_time !== undefined &&
			(!Number.isInteger(cleanData.recipe_cooking_time) || cleanData.recipe_cooking_time < 0)
		) {
			throw new Error('recipe_cooking_time doit être un entier >= 0.');
		}

		if (
			cleanData.recipe_like_number !== undefined &&
			(!Number.isInteger(cleanData.recipe_like_number) || cleanData.recipe_like_number < 0)
		) {
			throw new Error('recipe_like_number doit être un entier >= 0.');
		}

		return RecipesModels.update(recipe_id, cleanData);
	}
}

export default RecipesServices;
