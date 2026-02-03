import IngredientModels from '../models/ingredient.models.js';
import IngredientServices from '../services/ingredient.service.js';

class IngredientController {
	static async getAll(req, res,next) {
		try {
			const response = await IngredientModels.getAll();
			res.status(200).json(response);
		} catch (error) {
			error.status = 400;
			return next(error);
		}
	}

	static async getById(req, res,next) {
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
			error.status = 400;
			return next(error);
		}
	}

	static async create(req, res,next) {
		try {
			const newIngredient = req.body;
			console.log(newIngredient);
			const result = await IngredientServices.create(newIngredient);
			res.status(201).json(result);
		} catch (error) {
			error.status = 400;
			return next(error);
		}
	}

	static async update(req, res,next) {
		try {
			const id = Number(req.params.id);
			if (!id) throw new Error('Id invalide');

			const result = await IngredientServices.update(id, req.body);
			res.status(200).json(result);
		} catch (error) {
			return next(error);
		}
	}

	static async delete(req, res,next) {
		try {
			const id = Number(req.params.id);
			if (!id) throw new Error('Id invalide');

			const isDeleting = IngredientModels.delete(id);
			res.status(200).json(isDeleting);
		} catch (error) {
			return next(error);
		}
	}
}

export default IngredientController;
