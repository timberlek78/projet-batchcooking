// src/services/WeekService.js
// Rôle : logique métier + validations + appels aux Models

import WeekModels from '../models/week.models.js';

export default class WeekService {
	// Récupère toutes les entrées Week
	static getAll() {
		return WeekModels.getAll();
	}

	// Récupère une entrée Week par week_id
	static async getById(week_id) {
		// Vérifie que l'identifiant est valide
		const id = Number(week_id);

		if (!id) {
			const error = new Error('week_id invalide');
			error.status = 400;
			throw error;
		}

		// Appelle le model
		return WeekModels.getById(id);
	}

	// Récupère toutes les entrées Week d'un utilisateur
	static async getByUser(user_id) {
		// Vérifie que l'identifiant est valide
		const id = Number(user_id);

		if (!id) {
			const error = new Error('user_id invalide');
			error.status = 400;
			throw error;
		}

		// Appelle le model
		return WeekModels.getByUser(id);
	}

	// Crée une entrée Week (1 ligne = 1 recette liée)
	static async create(payload) {
		// Récupère les champs attendus
		const week_id = Number(payload.week_id);
		const user_id = Number(payload.user_id);
		const recipe_id = Number(payload.recipe_id);

		// Convertit les dates (Prisma accepte Date ou string ISO valide)
		const week_start = new Date(payload.week_start);
		const week_end = new Date(payload.week_end);

		// Validation des champs numériques
		if (!week_id || !user_id || !recipe_id) {
			const error = new Error(
				'Champs invalides : week_id, user_id, recipe_id doivent être des nombres valides.'
			);
			error.status = 400;
			throw error;
		}

		// Validation des dates
		if (Number.isNaN(week_start.getTime()) || Number.isNaN(week_end.getTime())) {
			const error = new Error(
				'Champs invalides : week_start et week_end doivent être des dates valides.'
			);
			error.status = 400;
			throw error;
		}

		// Validation logique des dates
		if (week_start > week_end) {
			const error = new Error('week_start ne peut pas être après week_end.');
			error.status = 400;
			throw error;
		}

		// Prépare les données au format attendu par Prisma
		const data = {
			week_id,
			week_start,
			week_end,
			user_id,
			recipe_id,
		};

		// Appelle le model pour créer en base
		return WeekModels.create(data);
	}

	// Met à jour une entrée Week
	static async update(week_id, payload) {
		// Vérifie l'identifiant
		const id = Number(week_id);

		if (!id) {
			const error = new Error('week_id invalide');
			error.status = 400;
			throw error;
		}

		// Filtre / normalise les champs modifiables
		const data = {};

		if (payload.week_start) {
			const week_start = new Date(payload.week_start);

			if (Number.isNaN(week_start.getTime())) {
				const error = new Error('week_start invalide');
				error.status = 400;
				throw error;
			}

			data.week_start = week_start;
		}

		if (payload.week_end) {
			const week_end = new Date(payload.week_end);

			if (Number.isNaN(week_end.getTime())) {
				const error = new Error('week_end invalide');
				error.status = 400;
				throw error;
			}

			data.week_end = week_end;
		}

		if (payload.user_id) {
			const user_id = Number(payload.user_id);

			if (!user_id) {
				const error = new Error('user_id invalide');
				error.status = 400;
				throw error;
			}

			data.user_id = user_id;
		}

		if (payload.recipe_id) {
			const recipe_id = Number(payload.recipe_id);

			if (!recipe_id) {
				const error = new Error('recipe_id invalide');
				error.status = 400;
				throw error;
			}

			data.recipe_id = recipe_id;
		}

		// Empêche une update vide
		if (Object.keys(data).length === 0) {
			const error = new Error('Aucune donnée à mettre à jour');
			error.status = 400;
			throw error;
		}

		// Appelle le model pour update
		return WeekModels.update(id, data);
	}

	// Supprime une entrée Week
	static async delete(week_id) {
		// Vérifie l'identifiant
		const id = Number(week_id);

		if (!id) {
			const error = new Error('week_id invalide');
			error.status = 400;
			throw error;
		}

		// Vérifie existence avant suppression (évite une exception Prisma)
		const existing = await WeekModels.getById(id);

		if (!existing) {
			return null;
		}

		// Supprime via le model
		return WeekModels.delete(id);
	}
}
