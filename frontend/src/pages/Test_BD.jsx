import { useEffect, useState } from 'react';
import styles from './styles/Test_BD.module.css';

function Test_BD() {
	const [message, setMessage] = useState('Chargement...');

	useEffect(() => {
		// Appel à ton serveur backend
		fetch('http://localhost:5000/db/db-health')
			.then((res) => res.json())
			.then((data) => setMessage(data.message))
			.catch(() => setMessage('Erreur de connexion au serveur 😢'));
	}, []);

	return (
		<div className={styles.container}>
			<h1>Test communication Front ↔ Back</h1>
			<p className={styles.message}>{message}</p>
		</div>
	);
}

export default Test_BD;
