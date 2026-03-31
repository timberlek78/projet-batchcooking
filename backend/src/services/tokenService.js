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

		const decoded = jwt.decode(token);

		console.log(token);
		// On stocke le token en BDD rattaché à l'utilisateur
		const result = await TokenModel.create({
			token_value:  token,
			token_expire: new Date(decoded.exp * 1000),
			user_id:      user.user_id,
		});

		return (!result ? token : null);
	}
}