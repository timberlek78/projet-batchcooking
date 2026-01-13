import { useNavigate } from 'react-router-dom';
import style from './recipeCard.module.css';

function RecipeCard({ recipe }) {
	const navigate = useNavigate();
	const ingredients = Array.isArray(recipe.ingredients)
		? recipe.ingredients
		: Object.values(recipe.ingredients ?? {});

	console.log(recipe);

	const onRecipeClick = () => {
		navigate(`/recipes/${recipe.recipe_id}`);
	};

	const onLike = () => {
		console.log('Like');
	};

	return (
		<div className={style.card} onClick={onRecipeClick}>
			<div className={style.title}>
				<h2>{recipe.recipe_name}</h2>
				<div className={style.like}>Like</div>
			</div>

			<div className={style.info}>
				<ul className={style.ing}>
					{ingredients.map((ing) => (
						<li key={ing.ingredient_id}>{ing.ingredient_name}</li>
					))}
				</ul>
				<div className={style.complementaire}>
					<div className={style.difficulte}>Difficulté : {recipe.recipe_difficult}</div>
					<div className={style.preparation}>
						Temps préparation : {recipe.recipe_preparation_time}
					</div>
				</div>
			</div>
		</div>
	);
}

export default RecipeCard;
