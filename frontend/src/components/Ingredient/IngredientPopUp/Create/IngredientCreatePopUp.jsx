import TextFieldPrincipal from "../../../TextField/Principale/TextFieldPrincipal";
import TextFieldSecondaire from "../../../TextField/Secondaire/TextFieldSecondaire";
import Ingredient from '../../../../constants/pages/recipes/AddIngredient.js'

import PenIcon from '../../../../assets/icons/recipes/add/pen.svg?react';
import RulesIcon from '../../../../assets/icons/recipes/add/rules.svg?react';
import CheckIcon from '../../../../assets/icons/recipes/add/check.svg?react';

import popup from '../popup.module.css';
import style from './popup.module.css';
import { useState } from "react";

function IngredientCreatePopUp({show,onClose})
{
	const [newIngredients, setNewIngredient] = useState();

	const saveIngredient = (attribut, valeur)=>
	{
		setNewIngredient((prev) => ({
			...prev,
			[attribut] : valeur
		}))
	}

	const stop = (e) => {e.stopPropagation()} 
	if(!show) return null;
	return(
		<div className={popup.overlay} onClick={onClose}>
			<div className={style.PopUp} onClick={stop} >
				<div className={style.content}>
					<TextFieldPrincipal 
						placeholder={Ingredient.placeholder.Nom}
						icon={<PenIcon className={style.icon}  />}
						onChange={(value) => (saveIngredient("ingredient_name",value))}
					/>
					<TextFieldSecondaire 
						placeholder={Ingredient.placeholder.Unite}
						icon={<RulesIcon  className={style.icon}/>}
						onChange={(value) => (saveIngredient("ingredient_unit",value))}
					/>
				</div>
				<div className={style.footer}>
					<button className={style.btn}>{<CheckIcon />}</button>
				</div>
			</div>
		</div>
	)
}

export default IngredientCreatePopUp;