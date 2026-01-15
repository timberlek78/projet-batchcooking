import style from './IngredientBulle.module.css';
import root from './bulle.module.css';
import DeleteIcon from '../../../assets/icons/recipes/add/close.svg?react';

function IngredientBulle({id,ingredientName,onClick})
{
	return(
		<div className={`${root.bulle} ${style.bulleText}`}>
			<div className={style.text}>{ingredientName}</div>
			<span onClick={()=>onClick(id)}>
				{<DeleteIcon />}
			</span>
		</div>
	)
}


export default IngredientBulle