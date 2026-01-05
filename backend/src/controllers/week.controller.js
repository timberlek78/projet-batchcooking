// src/controllers/WeekController.js
// Rôle : gérer HTTP (req/res) et déléguer au Service

import WeekService from '../services/WeekService.js';

export default class WeekController {
	// GET /api/weeks
	static async getAll(req, res, next) {
		try {
			const weeks = await WeekService.getAll();
			res.status(200).json(weeks);
		} catch (error) {
			return next(error);
		}
	}

	// GET /api/weeks/:id
	static async getById(req, res, next) {
		try {
			const week = await WeekService.getById(req.params.id);

			if (!week) {
				return res.status(404).json({ message: 'Semaine introuvable' });
			}

			res.status(200).json(week);
		} catch (error) {
			return next(error);
		}
	}

	// GET /api/weeks/user/:userId
	static async getByUser(req, res, next) {
		try {
			const weeks = await WeekService.getByUser(req.params.userId);
			res.status(200).json(weeks);
		} catch (error) {
			return next(error);
		}
	}

	// POST /api/weeks
	static async create(req, res, next) {
		try {
			const created = await WeekService.create(req.body);
			res.status(201).json(created);
		} catch (error) {
			return next(error);
		}
	}

	// PUT /api/weeks/:id
	static async update(req, res, next) {
		try {
			const updated = await WeekService.update(req.params.id, req.body);
			res.status(200).json(updated);
		} catch (error) {
			return next(error);
		}
	}

	// DELETE /api/weeks/:id
	static async delete(req, res, next) {
		try {
			const deleted = await WeekService.delete(req.params.id);

			if (!deleted) {
				return res.status(404).json({ message: 'Semaine introuvable' });
			}

			res.status(200).json({ message: 'Semaine supprimée' });
		} catch (error) {
			return next(error);
		}
	}
}
