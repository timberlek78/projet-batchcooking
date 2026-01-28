import express from 'express';
import RecipeController from '../controllers/recipes.controller.js';
import { uploadRecipeImage } from '../middleware/uploadRecipeImage.js';


const router = express.Router();

//CRUD Recipes
router.get('/', RecipeController.getAll);
router.get('/:id', RecipeController.getById);
router.get('/ingredient/:id', RecipeController.getIngredients);
router.post(
	'/recipes',
	uploadRecipeImage.single('image'),
	RecipeController.create
);

router.put('/:id', RecipeController.update);
router.delete('/:id', RecipeController.delete);

export default router;
