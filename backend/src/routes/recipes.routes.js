import express from 'express';
import RecipeController from '../controllers/recipes.controller.js';
import { uploadRecipeImage } from '../middleware/uploadRecipeImage.js';
import {authMiddleware, optionalAuthMiddleware} from '../middleware/auth.middleware.js';

const router = express.Router();

//CRUD Recipes
router.get('/',optionalAuthMiddleware, RecipeController.getAll);

router.get('/:id',optionalAuthMiddleware, RecipeController.getById);
router.get('/ingredient/:id' , optionalAuthMiddleware, RecipeController.getIngredients);
router.post(
	'/',
	authMiddleware,
	uploadRecipeImage.single('recipe_image'),
	RecipeController.create
);

router.post(
	'/like',
	authMiddleware,
	RecipeController.likeRecipe
);


router.get('/like/:user_id/:recipe_id', authMiddleware, RecipeController.isLike);
router.put('/:id', authMiddleware,RecipeController.update);
router.delete('/:id', authMiddleware, RecipeController.delete);

export default router;
