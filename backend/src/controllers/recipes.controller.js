import RecipesModels from '../models/recipes.models.js';
import RecipesServices from '../services/recipes.service.js';

class RecipeController {
	static async getAll(req, res) {
		try {
			const response = await RecipesModels.getAll();
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

			const response = await RecipesModels.getById(id);
			if (response) res.status(200).json(response);
			else throw new Error('ID introuvable');
		} catch (error) {
			res.status(404).json(error);
		}
	}

	static async create(req, res) {
		try {
			const newRecipes = req.body;
			const result = await RecipesServices.create(newRecipes);
			res.status(201).json(result);
		} catch (error) {
			//console.log(error);
			res.status(400).json(error.message);
		}
	}

	static async update(req, res) {
		try {
			const id = Number(req.params.id);
			if (!id) {
				throw new Error('Id invalide');
			}

			const new_recipes = await RecipesServices.update(id, req.body);
			return res.status(200).json(new_recipes);
		} catch (error) {
			res.status(400).json(error);
		}
	}

	static async delete(req, res) {
		try {
			const id = Number(req.params.id);
			if (!id) {
				throw new Error('Id invalide');
			}

			const isDeleting = RecipesModels.delete(id);
			res.status(200).json(isDeleting);
		} catch (error) {
			res.status(404).json(error.message);
		}
	}
}

export default RecipeController;
