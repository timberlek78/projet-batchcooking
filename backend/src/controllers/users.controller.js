import UserModels from '../models/users.models.js';
import { UsersService } from '../services/users.services.js';

export class UsersController {
	static async getAll(req, res, next) {
		try {
			const response = await UserModels.getAll();
			return res.status(200).json(response);
		} catch (error) {
			return next(error);
		}
	}

	static async getUserById(req, res, next) {
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
			return next(error);
		}
	}

	static async register(req, res, next) {
		try {
			const new_user = req.body;

			const result = await UsersService.register(new_user);

			return res.status(201).json(result);
		} catch (error) {
			return next(error);
		}
	}

	static async login(req, res, next)
	{
		try {
			const {email , password} = req.body;

			const result = await UsersService.login(email, password);
		
			return res.status(201).json(result);
		} catch (error) {
			return next(error);
		}
	}

	static async update(req, res, next) {
		try {
			const user_id = Number(req.params.id);

			if (!user_id) {
				return res.status(400).json({ error: 'ID invalide' });
			}

			const updatedUser = await UsersService.update(user_id, req.body);

			// Ne jamais renvoyer le password
			const { password, ...safeUser } = updatedUser;

			return res.status(200).json(safeUser);
		} catch (error) {
			return next(error);
		}
	}

	static async delete(req, res, next) {
		try {
			const id = Number(req.params.id);

			if (!id) {
				const err = new Error('ID invalide');
				err.statusCode = 400;
				throw err;
			}

			const isDeleting = await UserModels.delete(id);
			return res.status(200).json(isDeleting);
		} catch (error) {
			return next(error);
		}
	}
}
