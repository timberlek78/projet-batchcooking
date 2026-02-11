import axios from 'axios';
import ERROR from '../constants/errors.js';

const api = axios.create({
	baseURL: 'http://localhost:5000',
	timeout: 5000, // 5 secondes
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error);

		if (!error.response) {
			console.log('Erreur reseau / serveur injoignable / timeout', error);
			return Promise.reject({
				message: ERROR.NETWORK,
				code: 'NETWORK_ERROR',
				original: error,
			});
		}

		const { status, data } = error.response;

		//Erreur HTTP
		if (status === 401) //Token invalide ou expirer
		{
			localStorage.removeItem('token');
			console.warn(ERROR.TOKEN);

			return Promise.reject({
				message: ERROR.TOKEN,
				code: 'UNAUTHORIZED',
				status,
				data,
			});
		}

		if(status === 422)
		{
			return Promise.reject({
				message: ERROR.PASSWORD_WEAK,
				code: 'PASSWORD_WEAK',
				status,
				data,
			});
		}

		//Accès refusé
		if (status === 403) {
			return Promise.reject({
				message: ERROR.FORBIDDEN,
				code: 'FORBIDDEN',
				status,
				data,
			});
		}

		if (status === 404) {
			return Promise.reject({
				message: ERROR.NOT_FOUND,
				code: 'NOT_FOUND',
				status,
				data,
			});
		}

		if (status >= 500) {
			return Promise.reject({
				message: 'Erreur serveur. Réessaie plus tard.',
				code: 'SERVER_ERROR',
				status,
				data,
			});
		}

		// 3) Autres cas (400 etc.) : renvoyer le message backend si dispo
		return Promise.reject({
			message: data?.message || 'Une erreur est survenue.',
			code: 'API_ERROR',
			status,
			data,
		});
	}
);

export default api;
