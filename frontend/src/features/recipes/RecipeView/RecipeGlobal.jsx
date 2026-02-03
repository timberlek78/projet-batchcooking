import service from '../../../services/recipe.service.js';
import style from './recipeGlobal.module.css';
import DifficultBulle from './bulles/DifficultBulle.jsx';
import Bulle from './bulles/Bulle.jsx';

import PrepTimeIcon from '../../../assets/icons/recipes/add/cook-time.svg?react';
import CookTimeIcon from '../../../assets/icons/recipes/add/baker.svg?react';

function RecipeGlobal({ recipe }) {
	const imageUrl = service.getImage(recipe.recipe_image);

	
	return (
		<div
			className={style.info}
			style={{    
				backgroundImage: imageUrl ? `url(${imageUrl})` : 'none'
			}}
		>
		
		<div className={style.row}>
			<div className={`${style.bulle} ${style.name}`}>{recipe.recipe_name}</div>

			<div className={style.margin}>
				<DifficultBulle difficult={recipe.recipe_difficult} />
				<Bulle info={`${recipe.recipe_preparation_time} min `} icon={<PrepTimeIcon />}/>

				{recipe.recipe_cooking_time > 2 ? "" : <Bulle info={`${recipe.recipe_cooking_time} min `} icon={<CookTimeIcon />} />}
			</div>		
		</div>
		</div>
	);
}

export default RecipeGlobal;
