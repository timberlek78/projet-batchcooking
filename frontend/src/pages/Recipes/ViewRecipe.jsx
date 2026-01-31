import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import service from "../../services/recipe.service.js";
import RecipeGlobal from "../../features/recipes/RecipeView/RecipeGlobal.jsx";

function ViewRecipe() {
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState(null);

	useEffect(() => {
		const loadRecipe = async () => {
			const response = await service.getRecipeId(recipeId);
			if (response) {
                setRecipe(response.data);
			}
		};

		if (recipeId) {
			loadRecipe();
		}
	}, [recipeId]);


    console.log(recipe);
	if (!recipe) {
		return <p>Chargement...</p>;
	}

	return (
		<RecipeGlobal recipe={recipe} />
	);
}

export default ViewRecipe;
