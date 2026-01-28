import StepesModels from '../models/stepes.models.js';

class StepesServices {
	static async create(newStape) {
		if (!newStape || typeof newStape !== 'object') {
			throw new Error('Body invalide.');
		}

		const stepes_number = Number(newStape.stepes_number);
		const recipe_id = Number(newStape.recipe_id);

		if (!Number.isInteger(stepes_number) || stepes_number <= 0) {
			throw new Error('stepes_number invalide (doit être un entier > 0).');
		}

		if (!newStape.stepes_desc || typeof newStape.stape_desc !== 'string') {
			throw new Error('stape_desc invalide.');
		}

		if (!Number.isInteger(recipe_id) || recipe_id <= 0) {
			throw new Error('recipe_id invalide.');
		}

		return StepesModels.create({
			stepes_number,
			stepes_desc: newStape.stepes_desc,
			recipe_id,
		});
	}

	static async update(stepes_id, data) {
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

		const allowed = ['stepes_number', 'stepes_id'];
		const cleanData = {};

		for (const key of allowed) {
			if (data[key] !== undefined) {
				cleanData[key] = data[key];
			}
		}

		if (Object.keys(cleanData).length === 0) {
			throw new Error('Aucun champ valide à mettre à jour.');
		}

		if (cleanData.stepes_number !== undefined) {
			const stepes_number = Number(cleanData.stape_number);
			if (!Number.isInteger(stepes_number) || stepes_number <= 0) {
				throw new Error('stepes_number invalide (doit être un entier > 0).');
			}
			cleanData.stepes_number = stepes_number;
		}

		if (cleanData.stepes_desc !== undefined) {
			if (typeof cleanData.stepes_desc !== 'string' || cleanData.stepes_desc.length === 0) {
				throw new Error('stepes_desc invalide.');
			}
		}

		return StepesModels.update(stepes_id, cleanData);
	}
}

export default StepesServices;
