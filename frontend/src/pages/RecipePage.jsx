import { useState, useEffect } from 'react';
import { RecipeService as services } from '../services/recipe.service.js';
import RecipeCard from '../components/RecipeCard/RecipeCard.jsx';
import style from './styles/recipePage.module.css';
import RechercheField from '../components/Recherche/RechercheField.jsx';

function RecipePage() {
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				// 1) Récupérer toutes les recettes
				const response = await services.getRecipe();
				const baseRecipes = response.data;

				// 2) Pour chaque recette, récupérer ses ingrédients
				const recipesWithIngredients = await Promise.all(
					baseRecipes.map(async (recipe) => {
						const ingRes = await services.getIngredients(recipe.recipe_id);

						return {
							...recipe,
							ingredients: ingRes.data, // ✅ ici c’est DIRECTEMENT un array
						};
					})
				);

				// 3) Mettre à jour le state une seule fois
				setRecipes(recipesWithIngredients);
			} catch (err) {
				console.error(err);
				setError(err);
			}
		};

		fetchRecipes();
	}, []);

	return (
		<div className={style.page}>
			<div>
				<RechercheField />
			</div>

			{error && <p>Erreur : {error.message}</p>}

			<div className={style.container}>
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.recipe_id} recipe={recipe} />
				))}
			</div>
		</div>
	);
}

export default RecipePage;
