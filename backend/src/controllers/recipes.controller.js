import RecipesModels from '../models/recipes.models.js';
import RecipesServices from '../services/recipes.service.js';

class RecipeController {
	static async getAll(req, res) {
		try {
			const response = await RecipesModels.getAll();
			res.status(200).json(response);
		} catch (error) {
			return next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const id = Number(req.params.id);

			if (!id) {
				throw new Error('Id invalide');
			}

			const response = await RecipesModels.getById(id);
			if (response) res.status(200).json(response);
			else throw new Error('ID introuvable');
		} catch (error) {
			return next(error);
		}
	}

	static async getIngredients(req, res, next) {
		try {
			const id = Number(req.params.id);
			if (!id) {
				throw new Error('Id invalide');
			}

			const response = await RecipesServices.getIngredients(id);
			if (response) res.status(200).json(response);
			else throw new Error('ID introuvable');
		} catch (error) {
			return next(error);
		}
	}

	static async create(req, res, next) {
		try {
			const newRecipes = req.body;
			const result = await RecipesServices.create(newRecipes);
			res.status(201).json(result);
		} catch (error) {
			//console.log(error);
			return next(error);
		}
	}

	static async update(req, res, next) {
		try {
			const id = Number(req.params.id);
			if (!id) {
				throw new Error('Id invalide');
			}

			const new_recipes = await RecipesServices.update(id, req.body);
			return res.status(200).json(new_recipes);
		} catch (error) {
			return next(error);
		}
	}

	static async delete(req, res, next) {
		try {
			const id = Number(req.params.id);
			if (!id) {
				throw new Error('Id invalide');
			}

			const isDeleting = RecipesModels.delete(id);
			res.status(200).json(isDeleting);
		} catch (error) {
			return next(error);
		}
	}
}

export default RecipeController;
