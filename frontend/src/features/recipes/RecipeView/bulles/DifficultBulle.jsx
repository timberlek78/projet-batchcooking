import style from '../recipeGlobal.module.css';
import OvaleRempli from '../../../../assets/icons/recipes/view/ovale-rempli.svg?react';
import OvaleVide from '../../../../assets/icons/recipes/view/ovale-vide.svg?react';
import DifficultIcon from '../../../../assets/icons/recipes/view/difficult.svg?react';

function DifficultBulle ({difficult})
{
	return (
	<div className={`${style.bulle}`}>
		<DifficultIcon />	
		{
			Array.from({ length: 4 }).map((_, i) => i < difficult
				? <OvaleRempli key={i} />
				: <OvaleVide key={i} />
		)}
	</div>
	);
}


export default DifficultBulle;