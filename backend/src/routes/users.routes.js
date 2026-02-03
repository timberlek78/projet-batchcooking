import express from 'express';
import { UsersController } from '../controllers/users.controller.js';

const router = express.Router();

//End point CRUD pour la table USERS
router.get('/', UsersController.getAll);
router.get('/:id', UsersController.getUserById);

router.post('/', UsersController.register);

router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);

export default router;
