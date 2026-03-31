import express from 'express';
import RecipeController from '../controllers/recipes.controller.js';
import { uploadRecipeImage } from '../middleware/uploadRecipeImage.js';
import authMiddleware from '../middleware/auth.middleware.js';



const router = express.Router();

//CRUD Recipes
router.get('/', RecipeController.getAll);

router.get('/:id', RecipeController.getById);
router.get('/ingredient/:id' , authMiddleware, RecipeController.getIngredients);
router.post(
	'/',
	authMiddleware,
	uploadRecipeImage.single('recipe_image'),
	RecipeController.create
);

router.put('/:id', authMiddleware,RecipeController.update);
router.delete('/:id', authMiddleware, RecipeController.delete);

export default router;
