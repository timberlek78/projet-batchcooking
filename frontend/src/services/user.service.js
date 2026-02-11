import api from '../api/api.js';

export function getUsers() {
	return api.get('/users');
}

export function getUserId(id) {
	return api.get(`/users/${id}`);
}

export function login(data){
	return api.post(`/users/auth/login`,data)
}

export function create(data) {
	return api.post(`/users/auth/register`, data);
}
