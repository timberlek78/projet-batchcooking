import { useEffect, useState } from 'react';

function Users() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				let response = await fetch('http://localhost:5000/users');

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}`);
				}

				let users = await response.json();
				setUsers(users);
			} catch (error) {
				throw new Error(error.message);
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
