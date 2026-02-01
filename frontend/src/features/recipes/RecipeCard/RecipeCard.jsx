import { useNavigate } from 'react-router-dom';
import style from './recipeCard.module.css';

function RecipeCard({ recipe }) {
	const navigate = useNavigate();

	const ingredients = Array.isArray(recipe.ingredients)
		? recipe.ingredients
		: Object.values(recipe.ingredients ?? {});

	const onRecipeClick = () => {
		navigate(`/recipes/${recipe.recipe_id}`);
	};

	const onLike = (event) => {
		event.stopPropagation();
	};

	return (
		<div
			className={style.card}
			onClick={onRecipeClick}
			style={{
				backgroundImage: recipe.recipe_image
					? `url(${recipe.recipe_image})`
					: 'none',
			}}
		>
			<div className={style.overlay}>
				<div className={style.title}>
					<h2>{recipe.recipe_name}</h2>
					<div className={style.like} onClick={onLike}>❤️</div>
				</div>

				<div className={style.info}>
					<ul className={style.ing}>
						{ingredients.map((ing) => (
							<li key={ing.ingredient_id}>{ing.ingredient_name}</li>
						))}
					</ul>

					<div className={style.complementaire}>
						<div className={style.difficulte}>
							Difficulté : {recipe.recipe_difficult}
						</div>
						<div className={style.preparation}>
							{recipe.recipe_preparation_time} min
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RecipeCard;
