import { useState, useEffect } from 'react';
import { RecipeService as services } from '../../services/recipe.service.js';
import RecipeCard from '../../components/RecipeCard/RecipeCard.jsx';
import style from './style/recipePage.module.css';
import RechercheField from '../../components/Recherche/RechercheField.jsx';
import AddButton from '../../components/Button/AddButton/AddButton.jsx';

function RecipePage() {
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState('');

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
							ingredients: ingRes.data, 
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

	const filteredRecipes = recipes.filter((recipe) =>
		recipe.recipe_name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className={style.page}>
			<div className={style.top}>
				<div className={style.searchWrap}>
					<RechercheField onSearch={setSearch}/>
				</div>
				<AddButton routes='/recipes/add' />
		</div>


			{error && <p>Erreur : {error.message}</p>}

			<div className={style.container}>
				{filteredRecipes.length > 0 ? filteredRecipes.map((recipe) => (
					<RecipeCard key={recipe.recipe_id} recipe={recipe} />
				)) : <p>Aucune recette trouvée</p>}
			</div>
		</div>
	);
}

export default RecipePage;
