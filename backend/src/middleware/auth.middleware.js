import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError.js";
import { ErrorCodes } from "../errors/ApiError.js";

export default function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new ApiError(
			"Non authentifié",
			401,
			ErrorCodes.TOKEN_MISSING
		);
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		throw new ApiError(
			"Token invalide ou expiré",
			401,
			ErrorCodes.TOKEN_INVALID
		);
	}
}
