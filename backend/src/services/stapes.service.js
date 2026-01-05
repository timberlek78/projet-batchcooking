import StapesModels from '../models/stapes.models.js';

class StapesServices {
	static async create(newStape) {
		if (!newStape || typeof newStape !== 'object') {
			throw new Error('Body invalide.');
		}

		const stape_number = Number(newStape.stape_number);
		const recipe_id = Number(newStape.recipe_id);

		if (!Number.isInteger(stape_number) || stape_number <= 0) {
			throw new Error('stape_number invalide (doit être un entier > 0).');
		}

		if (!newStape.stape_desc || typeof newStape.stape_desc !== 'string') {
			throw new Error('stape_desc invalide.');
		}

		if (!Number.isInteger(recipe_id) || recipe_id <= 0) {
			throw new Error('recipe_id invalide.');
		}

		return StapesModels.create({
			stape_number,
			stape_desc: newStape.stape_desc,
			recipe_id,
		});
	}

	static async update(stape_id, data) {
		if (!data || typeof data !== 'object') {
			throw new Error('Body invalide.');
		}

		// Interdit de modifier la PK
		if ('stape_id' in data) {
			throw new Error("Impossible de modifier 'stape_id'.");
		}

		// (Optionnel) Interdit de changer de recette : à toi de voir
		// Si tu veux autoriser, enlève ce bloc
		if ('recipe_id' in data) {
			throw new Error("Impossible de modifier 'recipe_id' via update.");
		}

		const allowed = ['stape_number', 'stape_desc'];
		const cleanData = {};

		for (const key of allowed) {
			if (data[key] !== undefined) {
				cleanData[key] = data[key];
			}
		}

		if (Object.keys(cleanData).length === 0) {
			throw new Error('Aucun champ valide à mettre à jour.');
		}

		if (cleanData.stape_number !== undefined) {
			const stape_number = Number(cleanData.stape_number);
			if (!Number.isInteger(stape_number) || stape_number <= 0) {
				throw new Error('stape_number invalide (doit être un entier > 0).');
			}
			cleanData.stape_number = stape_number;
		}

		if (cleanData.stape_desc !== undefined) {
			if (typeof cleanData.stape_desc !== 'string' || cleanData.stape_desc.length === 0) {
				throw new Error('stape_desc invalide.');
			}
		}

		return StapesModels.update(stape_id, cleanData);
	}
}

export default StapesServices;
