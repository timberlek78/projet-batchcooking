import express from 'express';
import StapesController from '../controllers/stapes.controller';

const router = express.Router();

router.get('/', StapesController.getAll);
router.get('/:id', StapesController.getByRecipe);

router.post('/', StapesController.create);
router.put('/:id', StapesController.update);
router.delete('/:id', StapesController.delete);

export default router;
