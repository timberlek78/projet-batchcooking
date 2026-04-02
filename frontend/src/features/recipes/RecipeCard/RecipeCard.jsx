import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './recipeCard.module.css';
import service from '../../../services/recipe.service.js';

import IngredientIcon from '../../../assets/icons/recipes/ingredient.svg?react';
import PreparationIcon from '../../../assets/icons/recipes/add/cook-time.svg?react';
import LikeIcon from '../../../assets/icons/recipes/like.svg?react';
import DifficultBulle from '../RecipeView/bulles/DifficultBulle.jsx';
import recipeService from '../../../services/recipe.service.js';

import Bulle from '../RecipeView/bulles/Bulle.jsx';
import { isConnected } from '../../../utils/authUtils.jsx';

function RecipeCard({ recipe }) {
	const navigate = useNavigate();
	const [isLike, setIsLike] = useState(false);

	useEffect(() => {
		const user_id = localStorage.getItem('user_id');
		if (!user_id) return;

		recipeService.isLike(user_id, recipe.recipe_id)
		.then((res) => {
			 (res);
			setIsLike(!!res.data);
		});
	}, [recipe.recipe_id]);


	const ingredients = Array.isArray(recipe.ingredients)
		? recipe.ingredients
		: Object.values(recipe.ingredients ?? {});

	const imageUrl = service.getImage(recipe.recipe_image);
		

	const onRecipeClick = () => {
		navigate(`/recipes/${recipe.recipe_id}`);
	};

	const onLike = (event) => {
		if(!isConnected())	navigate('/users/login');

		const user_id = localStorage.getItem('user_id');
		const res = recipeService.setLike({ recipe_id : recipe.recipe_id, users_id : user_id});
		setIsLike(!isLike);
		event.stopPropagation();
	};

	 (isLike);
	return (
		<div
			className={style.card}
			onClick={onRecipeClick}
			style={{
				backgroundImage: recipe.recipe_image
					? `url(${imageUrl})`
					: 'none',
			}}
		>
			<div className={style.overlay}>
				<div className={style.haut}>
					<button onClick={onLike} className={`${style.like} ${isLike ? style.isLike : ''}`}>
						<LikeIcon />
					</button>
				</div>
				<div className={style.bas}>
					<div className={style.info}>
						<div className={style.name}>{recipe.recipe_name}</div>
						<div className={style.row} >
							<IngredientIcon />
							<div><b>Ingrédients</b></div>
						</div>
						<ul className={style.ing}>
							{ingredients.map((ing) => (
								<li key={ing.ingredient_id}>{ing.ingredient_name}</li>
							))}
						</ul>
					</div>

					<div className={style.complementaire}>
						<DifficultBulle difficult={recipe.recipe_difficult} />
						<Bulle info ={`${recipe.recipe_preparation_time} min`} icon={<PreparationIcon />} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default RecipeCard;
