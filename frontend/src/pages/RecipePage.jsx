import { useState, useEffect } from 'react';
import api from '../api/api.js';

function RecipePage() {
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState([]);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await api.getRecipes();
				setRecipes(response.data);
			} catch (error) {
				console.error(error);
				setError(error);
			}
		};

		fetchRecipes();
	}, []);

	return (
		<div>
			<div>
				{recipes.map((recipe) => {
					<RecipeCard recipe={recipe} />;
				})}
			</div>
		</div>
	);
}

export default RecipePage;
