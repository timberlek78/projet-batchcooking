import prisma from '../db.js';

export default class WeekModels {
	// Récupère toutes les entrées Week (triées par date de début)
	static getAll() {
		return prisma.week.findMany({
			orderBy: { week_start: 'desc' },
			include: {
				user: true,
				recipe: true,
			},
		});
	}

	// Récupère une entrée Week par week_id
	static getById(week_id) {
		return prisma.week.findUnique({
			where: { week_id },
			include: {
				user: true,
				recipe: true,
			},
		});
	}

	// Récupère toutes les entrées Week d'un utilisateur
	static getByUser(user_id) {
		return prisma.week.findMany({
			where: { user_id },
			orderBy: { week_start: 'desc' },
			include: {
				recipe: true,
			},
		});
	}

	// Récupère toutes les entrées Week d'une "semaine logique" (même week_id)
	// Utile si tu crées plusieurs lignes Week pour stocker 5 recettes
	static getByWeekId(week_id) {
		return prisma.week.findMany({
			where: { week_id },
			orderBy: { recipe_id: 'asc' },
			include: {
				recipe: true,
			},
		});
	}

	// Crée une entrée Week (1 ligne = 1 recette associée)
	static create(data) {
		return prisma.week.create({
			data,
			include: {
				user: true,
				recipe: true,
			},
		});
	}

	// Met à jour une entrée Week
	static update(week_id, data) {
		return prisma.week.update({
			where: { week_id },
			data,
			include: {
				user: true,
				recipe: true,
			},
		});
	}

	// Supprime une entrée Week (par week_id)
	static delete(week_id) {
		return prisma.week.delete({
			where: { week_id },
		});
	}
}
