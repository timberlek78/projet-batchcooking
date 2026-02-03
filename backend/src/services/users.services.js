import bcrypt from 'bcrypt';
import UsersModels from '../models/users.models.js';
import ApiError from '../errors/ApiError.js';
import { ErrorCodes } from '../errors/ApiError.js';
import { validatePassword, containsHTML, isValidName } from '../middleware/validator.js';

export class UsersService {

	static async register(new_users) 
	{
		const requiredFields = ["email", "password", "username"];
		const missing = requiredFields.filter(field => !new_users[field] || new_users[field].toString().trim() === "");

		if(missing.length > 0)
			throw new ApiError("Champs manquants", 400,ErrorCodes.MISSING_FIELD);

		const isValidPassword = validatePassword(new_users.password);
		if(new_users.password.length < 8 || isValidPassword)
			throw new ApiError("Mot de passe faible", 422, ErrorCodes.WEAK_PASSWORD);

		if (containsHTML(new_users.username)) 
			throw new ApiError("Caractères non autorisés",400,ErrorCodes.INVALID_CHARACTERS);
		
		if (!isValidName(new_users.username)) 
			throw new ApiError("Caractères non autorisés", 400,ErrorCodes.INVALID_CHARACTERS);
		
		const existing = await UsersModels.findByEmail(email);
		if (existing)
			throw new ApiError("Email déjà utilisé",409, ErrorCodes.EMAIL_ALREADY_EXISTS);
	
		//Hashage du password
		const password_hash = await bcrypt.hash(new_users.password, 10);
		new_users.password = password_hash;
		
		return UsersModels.create(new_users);
	}


	static async login(email, password)
	{
		if(email || password)
			throw new ApiError("Champs manquant", 400, ErrorCodes.MISSING_FIELD);

		const user = UsersModels.findByEmail(email);

		if(user)
			throw new ApiError("Email ou mot de passe incorrect", 401, ErrorCodes.AUTH_FAILED);

		const isValidPassword = await bcrypt.compare(password, user.password);
		if(!isValidPassword)
			throw new ApiError("Mot de passe incorrect", 401, ErrorCodes.AUTH_FAILED);

		const generateToken = (user) => {
			return jwt.sign(
				{
					user_id: user.user_id, // ou user.id selon ton modèle
					email: user.email
				},
				process.env.JWT_SECRET,
				{
					expiresIn: process.env.JWT_EXPIRES_IN
				}
			);
		}

		const token = generateToken(user);
					
		return result = {
			"success" : true,
			token,
			user : 
			{
				"user_id" : user.id,
				"email" : user.email,
				"username" : user.username
 			}
		};

		
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
