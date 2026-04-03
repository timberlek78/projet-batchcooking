
import { useEffect,useState } from "react";
import RecipeService from "../../../services/recipe.service.js";
import RecipeCard from "../../../features/recipes/RecipeCard/RecipeCard.jsx";
import style from "../style/profil.module.css";
import NoRecipeIcons from '../../../assets/icons/recipes/no-recipe.svg?react'
import {Recipe} from '../../../constants/pages/recipes/Recipe.js';

function OngletRecipe({user})
{
	const [recipes, setRecipes] = useState();

	useEffect(() => {
		const load = async () => {
			const user_id = localStorage.getItem("user_id");
			const response = await RecipeService.getRecipeUserId(user_id);

			const baseRecipes = Array.isArray(response.data) ? response.data : [response.data];
			const recipesWithIngredients = await Promise.all(
				baseRecipes.map(async (recipe) => {
					const ingRes = await RecipeService.getIngredients(recipe.recipe_id);
					return {
						...recipe,
						ingredients: ingRes.data,
					};
				})
			);

			setRecipes(recipesWithIngredients);
		};
		load();
	}, []);

	const handleDelete = (id) => {
		setRecipes(prev => prev.filter(r => r.recipe_id !== id));
	};

	if(!recipes) return <p>Chargement en cours...</p>
	return(
		<>
			<div className={recipes.length === 0 ? style.showNoRecipe :  style.showRecipe}>
				{recipes.length === 0 ? (
					<div className={style.noRecipe}>
						<NoRecipeIcons />
						<div>{Recipe.message.NoRecipe}</div>
					</div>
				) : (
					recipes.map((recipe) => (
						<RecipeCard recipe={recipe} modif={true} like={false} onDelete={handleDelete}/>
					))
				)}
			</div>
		</>
	)
}

export default OngletRecipe;