import api from '../api/api.js';

export function getUsers() {
	return api.get('/users');
}

export function getUserId(id) {
	return api.get(`/users/${id}`);
}

export async function login(data){
	return await api.post(`/users/auth/login`,data)
}

export async function create(data) {
	return await api.post(`/users/auth/register`,data)
}
