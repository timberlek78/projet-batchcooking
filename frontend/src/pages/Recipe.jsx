import { useEffect, useState } from 'react';
import { getRecipe } from '../services/recipe.service.js';

function Recipe() {
	// State : tableau de recettes
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await getRecipe();
				setRecipes(response.data);
			} catch (err) {
				setError(err.message);
				console.error(err);
			}
		};

		fetchRecipes();
	}, []);

	return (
		<div>
			<h1>Recettes</h1>
			<p>Liste de toutes les recettes enregistrées</p>

			{error && <p style={{ color: 'red' }}>{error}</p>}

			<ul>
				{recipes.map((recipe) => (
					<li key={recipe.recipe_id}>{recipe.recipe_name}</li>
				))}
			</ul>
		</div>
	);
}

export default Recipe;
