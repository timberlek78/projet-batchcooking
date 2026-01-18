import TextFieldPrincipal from "../../../TextField/Principale/TextFieldPrincipal";
import TextFieldSecondaire from "../../../TextField/Secondaire/TextFieldSecondaire";
import Ingredient from '../../../../constants/pages/recipes/AddIngredient.js'

import PenIcon from '../../../../assets/icons/recipes/add/pen.svg?react';
import RulesIcon from '../../../../assets/icons/recipes/add/rules.svg?react';
import CheckIcon from '../../../../assets/icons/recipes/add/check.svg?react';
import {create} from '../../../../services/ingredients.service.js';

import popup from '../popup.module.css';
import style from './popup.module.css';
import { useState } from "react";

function IngredientCreatePopUp({show,onClose})
{
	const [newIngredients, setNewIngredient] = useState();

	const createIngredient = (attribut, valeur)=>
	{
		setNewIngredient((prev) => ({
			...prev,
			[attribut] : valeur
		}))
	}

	const saveIngredient = async () =>
	{
		const response = await create(newIngredients);
		console.log(response);
		if(response.ok)
		{
			console.log("ok ?");
			if (onClose) onClose();

		}
	}

	const stop = (e) => {e.stopPropagation()} 
	if(!show) return null;
	return(
		<div className={popup.overlay} onClick={onClose}>
			<div className={style.PopUp} onClick={stop} >
				<div className={style.title}>
					<h2>{Ingredient.titre.create}</h2>
				</div>
				<div className={style.content}>
					<TextFieldPrincipal 
						placeholder={Ingredient.placeholder.Nom}
						icon={<PenIcon className={style.icon}  />}
						onChange={(value) => (createIngredient("ingredient_name",value))}
					/>
					<TextFieldSecondaire 
						placeholder={Ingredient.placeholder.Unite}
						icon={<RulesIcon  className={style.icon}/>}
						onChange={(value) => (createIngredient("ingredient_unit",value))}
					/>
				</div>
				<div className={style.footer}>
					<button className={style.btn} onClick={() => saveIngredient()}>{<CheckIcon />}</button>
				</div>
			</div>
		</div>
	)
}

export default IngredientCreatePopUp;