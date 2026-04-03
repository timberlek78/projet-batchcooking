
import { useEffect,useState } from "react";
import RecipeService from "../../../services/recipe.service.js";
import RecipeCard from "../../../features/recipes/RecipeCard/RecipeCard.jsx";
import style from "../style/profil.module.css";

function OngletRecipe({user})
{
	const [recipes, setRecipes] = useState();

	useEffect(() => {
		const load = async () => {
			const user_id = localStorage.getItem("user_id");
			const res = await RecipeService.getRecipeUserId(user_id);
			if (res) setRecipes(res.data);
		};
		load();
	}, []);

	const handleDelete = (id) => {
		setRecipes(prev => prev.filter(r => r.recipe_id !== id));
	};

	if(!recipes) return <p>Chargement en cours...</p>
	return(
		<>
			<div className={style.showRecipe}>
				{recipes.map((recipe) => (
					<RecipeCard recipe={recipe} modif={true} like = {false} onDelete={handleDelete}/>
				))}
			</div>
		</>
	)
}

export default OngletRecipe;