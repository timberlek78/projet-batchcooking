import { useEffect, useState } from 'react';
import { getUsers } from '../services/user.service';

function Users() {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await getUsers();
				setUsers(response.data);
			} catch (error) {
				setError(error);
				console.log(error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div>
			<h1>Utilisateur</h1>
			<p>Liste de tous les Utilisateur enregistrés</p>
			<ul>
				{users.map((user) => (
					<li key={user.user_id ?? user.user_id}>{user.username ?? user.username}</li>
				))}
			</ul>
		</div>
	);
}

export default Users;
