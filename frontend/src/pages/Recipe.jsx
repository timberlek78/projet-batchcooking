import { useEffect, useState } from 'react';

function Recipe() {
	// State : on stocke un tableau de recettes
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		/**
		 * Récupère les recettes au chargement du composant
		 */
		const fetchRecipes = async () => {
			try {
				const response = await fetch('http://localhost:5000/recipes');

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}`);
				}

				const data = await response.json();

				// Met à jour le state -> déclenche un re-render -> affichage
				setRecipes(data);
			} catch (error) {
				console.error('Erreur lors de la récupération des recettes :', error);
			}
		};

		fetchRecipes();
	}, []);

	return (
		<div>
			<h1>Recettes</h1>
			<p>Liste de toutes les recettes enregistrées</p>

			<ul>
				{recipes.map((recipe) => (
					<li key={recipe.recipe_id ?? recipe.id}>{recipe.recipe_name ?? recipe.name}</li>
				))}
			</ul>
		</div>
	);
}

export default Recipe;
