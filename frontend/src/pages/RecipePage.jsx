import { useState, useEffect } from 'react';
import { RecipeService as services } from '../services/recipe.service.js';
import RecipeCard from '../components/RecipeCard/RecipeCard.jsx';
import style from './styles/recipePage.module.css';

function RecipePage() {
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState([]);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await services.getRecipe();
				setRecipes(response.data);
			} catch (error) {
				console.error(error);
				setError(error);
			}
		};

		fetchRecipes();
	}, []);

	return (
		<div className={style.page}>
			<div>
				<p> RECHERCHE </p>
			</div>
			<div className={style.container}>
				{recipes.map((recipe) => {
					return <RecipeCard key={recipe.recipe_id} recipe={recipe} />;
				})}
			</div>
		</div>
	);
}

export default RecipePage;
