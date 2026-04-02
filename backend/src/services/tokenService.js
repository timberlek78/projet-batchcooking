import jwt from 'jsonwebtoken';
import TokenModel from '../models/token.models.js';


export class TokenService
{
	static async generateToken(user) {
		const token = jwt.sign(
			{ user_id: user.user_id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN }
		);

		// Décoder le token pour récupérer l'expiration
		const decoded = jwt.decode(token);

		const result = await TokenModel.create({
			token_value:  token,
			token_expire: new Date(decoded.exp * 1000),
			user_id:      user.user_id,
		});

		if (!result) return null;

		return token;
	}
}