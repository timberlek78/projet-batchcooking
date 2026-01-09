import style from './recipeCard.module.css';

function RecipeCard({ key, recipe }) {
	return (
		<div className={style.card}>
			<h2>{recipe.recipe_name}</h2>
			<p>Difficulté : {recipe.recipe_difficult}</p>
			<p>Temps preparation : {recipe.recipe_preparation_time}</p>
			<ul>
				{recipe.ingredients.map((ing) => {
					<li key={ing.ingrediens_id}> {ing.ingredient_name}</li>;
				})}
			</ul>
		</div>
	);
}

export default RecipeCard;
