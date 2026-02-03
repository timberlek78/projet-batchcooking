import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import service from "../../services/recipe.service.js";
import RecipeGlobal from "../../features/recipes/RecipeView/RecipeGlobal.jsx";

import style from "./style/view.module.css";
import ListIngredient from "../../features/recipes/RecipeView/ListIngredient/ListIngredient.jsx";
import StepesView from "../../features/recipes/Stepes/StepesView.jsx";

function ViewRecipe() {
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [ingredient, setIngredient ] = useState([])
	const [stepes, setStepes] = useState([]);

	useEffect(() => {
		const loadRecipe = async () => {
			const response = await service.getRecipeId(recipeId);
			if (response) {
                setRecipe(response.data);
			}
		};

		const loadIng = async () => {
			const response = await service.getIngredients(recipeId);
		
			if(response)
			{
				setIngredient(response.data);
			}
		}

		const loadStepe = async () => {
			const response = await service.getStepe(recipeId);

			if(response)
				setStepes(response.data);
			
		}

		if (recipeId) {
			loadStepe();
			loadIng();
			loadRecipe();
		}
	}, [recipeId]);

	if (!recipe) {
		return <p>Chargement...</p>;
	}

	

	return (
		<div className={style.content}>
			<div className={style.row}>
				<div className={style.recipe}>
					<RecipeGlobal recipe={recipe} />
				</div>

				<div className={style.side}>
					<ListIngredient ingredient={ingredient} />
				</div>
			
			</div>
			
			<div className={style.stepe}>
				{
					stepes.map((stepe) => (
						<StepesView key={stepe.stepes_id} stepe={stepe} />
					))
				}
			</div>
		</div>
	);
}

export default ViewRecipe;
