import IngredientModels from '../models/ingredient.models';
import IngredientServices from '../services/ingredient.service';

class IngredientController {
	static async getAll(req, res) {
		try {
			const response = await IngredientModels.getAll();
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	static async getById(req, res) {
		try {
			const id = Number(req.params.id);
			if (!id) {
				throw new Error('Id invalide');
			}
			const response = await IngredientModels.getById(id);
			console.log(response);
			if (response) res.status(200).json(response);
			else throw new Error('ID introuvable');
		} catch (error) {
			res.status(404).json(error.message);
		}
	}

	static async create(req, res) {
		try {
			const newIngredient = req.body;
			const result = await IngredientServices.create(newIngredient);
			res.status(201).json(result);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	static async update(req, res) {
		try {
			const id = Number(req.params.id);
			if (!id) throw new Error('Id invalide');

			const result = await IngredientServices.update(id, req.body);
			res.status(200).json(result);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	static async delete(req, res) {
		try {
			const id = Number(req.params.id);
			if (!id) throw new Error('Id invalide');

			const isDeleting = IngredientModels.delete(id);
			res.status(200).json(isDeleting);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}
}

export default IngredientController;
