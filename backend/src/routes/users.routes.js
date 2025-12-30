import express from 'express';
import { UsersConstroller } from '../controllers/users.controller.js';

const router = express.Router();

//End point CRUD pour la table USERS
router.get('/', UsersConstroller.getAll);
router.get('/:id', UsersConstroller.getUserById);

router.post('/', UsersConstroller.register);

router.put('/:id', UsersConstroller.update);
router.delete('/:id', UsersConstroller.delete);

export default router;
