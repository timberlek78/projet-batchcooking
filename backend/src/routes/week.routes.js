import express from 'express';
import WeekController from '../controllers/week.controller.js';

const router = express.Router();

/**
 * GET /weeks
 * Rôle : récupérer toutes les semaines
 */
router.get('/', WeekController.getAll);

/**
 * GET /weeks/user/:userId
 * Rôle : récupérer toutes les semaines d’un utilisateur
 */
router.get('/user/:userId', WeekController.getByUser);

/**
 * GET /weeks/:id
 * Rôle : récupérer une semaine par week_id
 */
router.get('/:id', WeekController.getById);

/**
 * POST /weeks
 * Rôle : créer une semaine
 */
router.post('/', WeekController.create);

/**
 * PUT /weeks/:id
 * Rôle : mettre à jour une semaine par week_id
 */
router.put('/:id', WeekController.update);

/**
 * DELETE /weeks/:id
 * Rôle : supprimer une semaine par week_id
 */
router.delete('/:id', WeekController.delete);

export default router;
