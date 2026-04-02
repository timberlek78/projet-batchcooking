import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError.js";
import { ErrorCodes } from "../errors/ApiError.js";
import { TokenService } from "../services/tokenService.js";
import tokenModels from "../models/token.models.js";

export async function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
	throw new ApiError("Non authentifié", 401, ErrorCodes.TOKEN_MISSING);
	}

	const token = authHeader.split(" ")[1];

	// 1. Vérifier la signature JWT
	let decoded;
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		throw new ApiError("Token invalide ou expiré", 401, ErrorCodes.TOKEN_INVALID);
	}

	// 2. Vérifier en BDD (révocation)
	const tokenInBDD = await tokenModels.findByValue(token);
	if (!tokenInBDD) {
		throw new ApiError("Token révoqué", 401, ErrorCodes.TOKEN_REVOKED);
	}

	req.user = decoded;
	next();
}

export async function optionalAuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        req.user = null;
        return next(); 
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const tokenInBDD = await tokenModels.findByValue(token);
        req.user = tokenInBDD ? decoded : null;
    } catch {
        req.user = null;
    }

    next();
}

