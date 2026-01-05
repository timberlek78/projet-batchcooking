import IngredientModels from '../models/ingredient.models';

class IngredientServices {
	static async update(ingredient_id, data) {
		if (!data || typeof data !== 'object') {
			throw new Error('Body invalide.');
		}

		// Interdit de modifier ingredient_id
		if ('ingredient_id' in data) {
			throw new Error("Impossible de modifier 'ingredient_id'.");
		}

		// Whitelist : champs modifiables
		const allowed = ['ingredient_name', 'ingredient_unit'];

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
			cleanData.ingredient_name !== undefined &&
			(typeof cleanData.ingredient_name !== 'string' ||
				cleanData.ingredient_name.trim().length === 0 ||
				cleanData.ingredient_name.length > 255)
		) {
			throw new Error('ingredient_name doit être une chaîne non vide (max 255).');
		}

		if (
			cleanData.ingredient_unit !== undefined &&
			(typeof cleanData.ingredient_unit !== 'string' ||
				cleanData.ingredient_unit.trim().length === 0 ||
				cleanData.ingredient_unit.length > 5)
		) {
			throw new Error('ingredient_unit doit être une chaîne non vide (max 5).');
		}

		if (cleanData.ingredient_name) cleanData.ingredient_name = cleanData.ingredient_name.trim();
		if (cleanData.ingredient_unit) cleanData.ingredient_unit = cleanData.ingredient_unit.trim();

		return IngredientModels.update(ingredient_id, cleanData);
	}

	static async create(data) {
		if (!data || typeof data !== 'object') {
			throw new Error('Body invalide.');
		}

		// Interdit de fournir ingredient_id (auto-incrément)
		if ('ingredient_id' in data) {
			throw new Error("Impossible de fournir 'ingredient_id'.");
		}

		// Whitelist : champs autorisés à la création
		const allowed = ['ingredient_name', 'ingredient_unit'];

		const cleanData = {};

		for (const key of allowed) {
			if (data[key] !== undefined) {
				cleanData[key] = data[key];
			}
		}

		// Champs obligatoires
		if (!cleanData.ingredient_name) {
			throw new Error("Le champ 'ingredient_name' est obligatoire.");
		}

		if (!cleanData.ingredient_unit) {
			throw new Error("Le champ 'ingredient_unit' est obligatoire.");
		}

		// Validations
		if (
			typeof cleanData.ingredient_name !== 'string' ||
			cleanData.ingredient_name.trim().length === 0 ||
			cleanData.ingredient_name.length > 255
		) {
			throw new Error('ingredient_name doit être une chaîne non vide (max 255).');
		}

		if (
			typeof cleanData.ingredient_unit !== 'string' ||
			cleanData.ingredient_unit.trim().length === 0 ||
			cleanData.ingredient_unit.length > 5
		) {
			throw new Error('ingredient_unit doit être une chaîne non vide (max 5).');
		}

		// Normalisation (recommandé)
		cleanData.ingredient_name = cleanData.ingredient_name.trim();
		cleanData.ingredient_unit = cleanData.ingredient_unit.trim();

		return IngredientModels.create(cleanData);
	}
}

export default IngredientServices;
