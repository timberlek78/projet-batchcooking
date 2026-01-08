function RecipeCard({ recipe }) {
	return (
		<div>
			<h2>{recipe.name}</h2>
			<p>Difficulté : {recipe.recipe_difficult}</p>
		</div>
	);
}

export default RecipeCard;
