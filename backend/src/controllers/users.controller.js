import UserModels from '../models/users.models';
import { UsersService } from '../services/users.services';

export class UsersConstroller {
	static async getAll(req, res) {
		try {
			const response = await UserModels.getAll();
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	static async getUserById(req, res) {
		try {
			const id = Number(req.params.id);

			if (!id) {
				return res.status(400).json({ error: 'ID invalide' });
			}

			const response = await UserModels.getById(id);

			if (!response) {
				return res.status(404).json({ error: 'Utilisateur non trouvé' });
			}

			// Ne jamais renvoyer le password
			const { password, ...safeUser } = response;

			return res.status(200).json(safeUser);
		} catch (error) {
			console.error(error.message);
			return res.status(500).json({ error: 'Erreur serveur' });
		}
	}

	static async register(req, res) {
		try {
			const { username, email, password } = req.body;
			const result = await UsersService.register(username, email, password);

			const user = {
				user_id: result.user_id,
				username: result.username,
				email: result.email,
			};

			res.status(201).json(user);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	static async update(req, res) {
		try {
			const user_id = Number(req.params.id);
			if (!user_id) {
				return res.status(400).json({ error: 'ID invalide' });
			}

			// Exemple body: { username: "new", email: "...", password: "..." }
			const updatedUser = await UsersService.update(user_id, req.body);

			// Ne jamais renvoyer le password
			const { password, ...safeUser } = updatedUser;
			return res.status(200).json(safeUser);
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: error.message });
		}
	}

	static async delete(req, res) {
		try {
			const id = Number(req.params.id);

			if (!id) {
				throw new Error('Id invalide');
			}

			const isDeleting = await UserModels.delete(id);
			res.status(200).json(isDeleting);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	}
}
