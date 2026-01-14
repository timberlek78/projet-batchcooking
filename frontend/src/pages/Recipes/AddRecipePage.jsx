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
	const [show,setShow] = useState(false);
	console.log(show)

	return(
		<div className={style.page}>
			<IngredientPopUp show={show} />

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
							<div className={style.listIng}>
								<IngredientBulle ingredientName="aaaa"/>
								<IngredientBulle ingredientName="aaaa"/>
								<IngredientBulle ingredientName="aaaa"/>
								<IngredientBulle ingredientName="aaaa"/>
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


function addIngredient()
{
	console.log("je suis la ")
}
export default AddRecipePage