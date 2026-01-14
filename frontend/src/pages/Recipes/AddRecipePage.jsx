import TextFieldSecondaire from '../../components/TextField/Secondaire/TextFieldSecondaire.jsx'
import TextFieldPrincipal from '../../components/TextField/Principale/TextFieldPrincipal.jsx'
import IngredientBulle from '../../components/Ingredient/IngredientBulle/IngredientBulle.jsx';
import AddIngredientBulle from '../../components/Ingredient/IngredientBulle/AddIngredientBulle.jsx'
import style from './style/add.module.css'
import CookTimeIcon from '../../assets/icons/recipes/add/cook-time.svg?react';
import CookingTimeIcon from '../../assets/icons/recipes/add/baker.svg?react';
import DifficultIcon from '../../assets/icons/recipes/add/dumbbell.svg?react';
import PeopleIcon from '../../assets/icons/recipes/add/people.svg?react';
import Recipe from '../../constants/pages/recipes/AddRecipe.js'
import IngredientPopUp from '../../components/Ingredient/IngredientPopUp/IngredientPopUp.jsx';
import { useState } from 'react';

function AddRecipePage()
{
	const [ingredients,setIngredients] = useState([]);
	const [show,setShow] = useState(false);

	const addIngredient = (ingredient,checked)=>
	{
		ingredient.checked = true;
		setIngredients((prev) => {
		if (checked) {
			// éviter les doublons
			if (prev.some((i) => i.ingredient_id === ingredient.ingredient_id)) {
				return prev;
			}
			return [...prev, ingredient];
		} else {
			// retirer si décoché
			return prev.filter((i) => i.ingredient_id !== ingredient.ingredient_id);
		}
	});
	}

	console.log(ingredients);
	return(
		<div className={style.page}>
			<IngredientPopUp show={show} onClose={() => setShow(false)} addIng={addIngredient} />

			<div  className={style.haut}>
				<div id="photo" className={style.photo}> {/**Conteneur photo */}
					<input type="image" />
				</div>
				<div className={style.recipe}>
					<div>
						<TextFieldPrincipal placeholder={Recipe.placeholder.name} />
					</div>
					<div className={style.row}>
						<div className={style.ingredient}>
							<p>Liste Ingredient</p>
							<div id="listIng" className={style.listIng}>
								{ingredients.map((ing) =>(
									<IngredientBulle ingredientName={ing.ingredient_name} />
								))}
								<AddIngredientBulle onClick={() => setShow(true)}/>
							</div>
						</div>
						<div className={style.infoGene}>
							<TextFieldSecondaire placeholder={Recipe.placeholder.tmpPrep} icon={<CookTimeIcon />} />
							<TextFieldSecondaire placeholder={Recipe.placeholder.tmpCooking} icon={<CookingTimeIcon />} />
							<div className={style.row}>
								<TextFieldSecondaire placeholder={Recipe.placeholder.difficult} icon={<DifficultIcon />} />
								<TextFieldSecondaire placeholder={Recipe.placeholder.nbPersonne} icon={<PeopleIcon />} />
							</div>
						</div>	
					</div>
				</div>
	
			</div>

			<div className={style.stape}>
				<ul>
					<li>aaaa</li>
					<li>aaaa</li>
					<li>aaaa</li>
					<li>aaaa</li>
					<li>aaaa</li>
				</ul>
			</div>

		</div>
	)
}


export default AddRecipePage