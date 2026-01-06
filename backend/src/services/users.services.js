import bcrypt from 'bcrypt';
import UsersModels from '../models/users.models.js';

export class UsersService {
	static async register(username, email, password) {
		//Vérification de l'unicité de l'email
		const existing = await UsersModels.findByEmail(email);
		if (existing) throw new Error('Email déjà utilisé.');

		//Hashage du password
		const password_hash = await bcrypt.hash(password, 10);
		return UsersModels.create(username, email, password_hash);
	}

	static async update(user_id, data) {
		if (!data || typeof data !== 'object') {
			throw new Error('Body invalide.');
		}

		// Interdit de modifier user_id
		if ('user_id' in data) {
			throw new Error("Impossible de modifier 'user_id'.");
		}

		// Whitelist : champs modifiables
		const allowed = ['username', 'email', 'password'];
		const cleanData = {};

		for (const key of allowed) {
			if (data[key] !== undefined) {
				cleanData[key] = data[key];
			}
		}

		if (Object.keys(cleanData).length === 0) {
			throw new Error('Aucun champ valide à mettre à jour.');
		}

		// Hash si password présent
		if (cleanData.password) {
			cleanData.password = await bcrypt.hash(cleanData.password, 10);
		}

		return UsersModels.update(user_id, cleanData);
	}
}
