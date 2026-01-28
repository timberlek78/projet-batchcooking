import StepesModels from '../models/stepes.models.js';
import StepesServices from '../services/stepes.service.js';

class StepesController {
	static async getAll(req, res) {
		try {
			const response = await StepesModels.getAll();
			return res.status(200).json(response);
		} catch (error) {
			return next(error);
		}
	}

	static async getByRecipe(req, res) {
		try {
			const id = Number(req.params.id);
			if (!id) {
				throw new Error('Id Invalide');
			}

			const response = await StepesModels.getByRecipe(id);

			// ✅ tableau vide => aucune étape trouvée
			if (!response || response.length === 0) {
				return res.status(404).json({ error: 'Aucune étape trouvée pour cette recette' });
			}

			return res.status(200).json(response);
		} catch (error) {
			return next(error);
		}
	}

	static async create(req, res) {
		try {
			const newStepe = req.body;

			const result = await StepesServices.create(newStepe);
			return res.status(201).json(result);
		} catch (error) {
			error.status = 400;
			return next(error);
		}
	}

	static async update(req, res) {
		try {
			const id = Number(req.params.id);
			if (!id) {
				throw new Error('Id invalide');
			}

			const result = await StepesServices.update(id, req.body);
			return res.status(200).json(result);
		} catch (error) {
			return next(error);
		}
	}

	static async delete(req, res) {
		try {
			const id = Number(req.params.id);
			if (!id) {
				throw new Error('Id invalide');
			}

			const isDeleting = await StepesModels.delete(id);
			return res.status(200).json(isDeleting);
		} catch (error) {
			return next(error);
		}
	}
}

export default StepesController;
