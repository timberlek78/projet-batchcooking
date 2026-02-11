
export function validatePassword(password) {
	return (
		/[A-Z]/.test(password) &&
		/[a-z]/.test(password) &&
		/[0-9]/.test(password) &&
		/[^A-Za-z0-9]/.test(password) &&
		password.length >= 8
	);
}


export function containsHTML(value) {
	return /<[^>]*>/g.test(value);
}

export function isValidName(value) {
	return /^[a-zA-ZÀ-ÿ\-'\s]{2,50}$/.test(value);
}