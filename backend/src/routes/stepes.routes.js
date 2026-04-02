import express from 'express';
import StepesController from '../controllers/stepes.controller.js';
import { optionalAuthMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', StepesController.getAll);
router.get('/:id',optionalAuthMiddleware, StepesController.getByRecipe);

router.post('/', StepesController.create);
router.put('/:id', StepesController.update);
router.delete('/:id', StepesController.delete);

export default router;
