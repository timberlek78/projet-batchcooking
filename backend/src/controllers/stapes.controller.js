import StapesModels from '../models/stapes.models.js';
import StapesServices from '../services/stapes.service.js';

class StapesController {
	static async getAll(req, res) {
		try {
			const response = await StapesModels.getAll();
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

			const response = await StapesModels.getByRecipe(id);

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
			const newStape = req.body;

			const result = await StapesServices.create(newStape);
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

			const result = await StapesServices.update(id, req.body);
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

			const isDeleting = await StapesModels.delete(id);
			return res.status(200).json(isDeleting);
		} catch (error) {
			return next(error);
		}
	}
}

export default StapesController;
