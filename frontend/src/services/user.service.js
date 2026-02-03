import api from '../api/api.js';

export function getUsers() {
	return api.get('/users');
}

export function getUserId(id) {
	return api.get(`/users/${id}`);
}

export function create(data) {
	return api.post(`/users`, data);
}
