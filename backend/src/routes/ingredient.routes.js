import express from 'express';
import IngredientController from '../controllers/ingredient.controller.js';

const router = express.Router();

router.get('/', IngredientController.getAll);
router.get('/:id', IngredientController.getById);

router.post('/', IngredientController.create);

router.put('/:id', IngredientController.update);

router.delete('/:id', IngredientController.delete);

export default router;
