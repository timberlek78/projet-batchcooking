const HOME = {
	Titre: {
		Batchcooking: 'BatchCooking',
		Objectif: 'Objectifs du projet',
		Techno: 'Technologies utilisées',
		Architecture: 'Architecture du projet',
		Auteur: 'Auteur du projet',
	},

	Contenu: {
		Batchcooking:
			'BatchCooking est une application web permettant de gérer des recettes et d’organiser des repas sur une semaine, dans une logique de batch cooking (préparer à l’avance pour gagner du temps). Le projet vise à centraliser les recettes, faciliter leur consultation et poser les bases d’une planification hebdomadaire efficace.',

		Objectif: {
			1: 'Centraliser les recettes dans une application unique',
			2: 'Faciliter la consultation et la gestion des recettes',
			3: 'Préparer la planification des repas à la semaine',
			4: 'Mettre en place une architecture propre, maintenable et évolutive',
		},

		Techno: {
			FrontEnd: {
				Titre: 'Frontend',
				1: 'React',
				2: 'React Router',
				3: 'Axios (instance centralisée avec interceptors)',
				4: 'CSS (Flexbox, composants réutilisables)',
			},
			BackEnd: {
				Titre: 'Backend',
				1: 'Node.js',
				2: 'Express',
				3: 'API REST',
				4: 'Base de données SQL (via Prisma)',
			},
		},

		Architecture: {
			1: 'Séparation claire entre le frontend et le backend',
			2: 'Utilisation de composants réutilisables côté frontend',
			3: 'Mise en place d’un layout commun (header, footer, contenu dynamique)',
			4: 'Services dédiés pour les appels API',
			5: 'Gestion centralisée des erreurs et des chaînes de caractères',
		},

		Auteur: 'Thomas BOUDEELE aka Thominou',
	},
};

export default HOME;
