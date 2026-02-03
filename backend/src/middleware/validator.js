
export function validatePassword(password) {
	const rules = {
		uppercase: /[A-Z]/.test(password),
		lowercase: /[a-z]/.test(password),
		number: /[0-9]/.test(password),
		special: /[^A-Za-z0-9]/.test(password),
		length: password.length >= 8,
	};

	return rules;
}

export function containsHTML(value) {
	return /<[^>]*>/g.test(value);
}

export function isValidName(value) {
	return /^[a-zA-ZÀ-ÿ\-'\s]{2,50}$/.test(value);
}