class ApiError extends Error {
	constructor(message, statusCode, code) {
		super(message);
		this.statusCode = statusCode;
		this.code = code;
	}
}

export const ErrorCodes = {
	EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
	WEAK_PASSWORD: "WEAK_PASSWORD",
	AUTH_FAILED: "AUTH_FAILED",
    MISSING_FIELD : "MISSING FIELD",
    INVALID_CHARACTERS : "INVALID_CHARACTERS"
};

export default ApiError