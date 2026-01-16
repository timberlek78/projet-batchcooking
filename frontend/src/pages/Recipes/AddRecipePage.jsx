import TextFieldSecondaire from '../../components/TextField/Secondaire/TextFieldSecondaire.jsx'
import TextFieldPrincipal from '../../components/TextField/Principale/TextFieldPrincipal.jsx'
import IngredientBulle from '../../components/Ingredient/IngredientBulle/IngredientBulle.jsx';
import AddIngredientBulle from '../../components/Ingredient/IngredientBulle/AddIngredientBulle.jsx'
import style from './style/add.module.css'
import CookTimeIcon from '../../assets/icons/recipes/add/cook-time.svg?react';
import CookingTimeIcon from '../../assets/icons/recipes/add/baker.svg?react';
import DifficultIcon from '../../assets/icons/recipes/add/dumbbell.svg?react';
import PeopleIcon from '../../assets/icons/recipes/add/people.svg?react';
import AddIcon from '../../assets/icons/components/add.svg?react';
import Recipe from '../../constants/pages/recipes/AddRecipe.js'
import IngredientPopUp from '../../components/Ingredient/IngredientPopUp/Select/IngredientPopUp.jsx';
import IngredientCreatePopUp from '../../components/Ingredient/IngredientPopUp/Create/IngredientCreatePopUp.jsx'
import { useState } from 'react';
import ImageField from '../../components/ImageField/ImageField.jsx';

function AddRecipePage()
{
	const [newRecipe, setRecipe] = useState({ingredients : []});
	const [show,setShow] = useState(false);
	const [createShow, setCreateShow] = useState(false);

	const addIngredient = (ingredient, checked) => {
		setRecipe((prev) => {
			let nextIngredients;

			if (checked) {
				if (prev.ingredients.some((i) => i.ingredient_id === ingredient.ingredient_id)) {
					nextIngredients = prev.ingredients;
				} else {
					nextIngredients = [...prev.ingredients, ingredient];
				}
			} else {
				nextIngredients = prev.ingredients.filter(
					(i) => i.ingredient_id !== ingredient.ingredient_id
				);
			}

			return {
				...prev,
				ingredients: nextIngredients,
			};
		});
	};

	const removeIngredient = (id) => {
		setRecipe((prev) => {
			const newIngredients = prev.ingredients.filter(
				(ing) => ing.ingredient_id !== id
			);

			return {
				...prev,
				ingredients: newIngredients,
			};
		});
	};



	const saveRecipe = (attribut, valeur) => {
		setRecipe((prev) => ({
			...prev,
			[attribut] : valeur
		}));


		console.log(newRecipe);
	};

	return(
		<div className={style.page}>
			<IngredientPopUp
				show={show}
				onClose={() => setShow(false)}
				addIng={addIngredient}
				selectedIngredients={newRecipe.ingredients}
			/>

			<IngredientCreatePopUp
				show={createShow}
				onClose={() => setCreateShow(false)}
			/>

			<div  className={style.haut}>
				<div className={`${style.recipe} ${style.photo}`}>
					
					<ImageField />
				</div>
				<div className={style.recipe}>

					{/********************/
					/* NOM DE LA RECETTE */
					/********************/}

					<div>
						<TextFieldPrincipal 
							placeholder={Recipe.placeholder.name} 
							onChange={(value) => saveRecipe("recipe_name",value)}
						/>
					</div>	
					<div className={style.row}>

						{/********************/
						/* LISTE INGREDIENT */
						/********************/}
						<div className={style.ingredient}>
							<div className={style.IngredientRow}>
								<div className = {style.title}>Liste Ingredient</div>
								<div className = {style.addBtn} onClick = {() => setCreateShow(true)}>{<AddIcon />}</div>
							</div>

							<div id="listIng" className={style.listIng}>
								{newRecipe.ingredients?.map((ing) =>(
									<IngredientBulle id={ing.ingredient_id} ingredientName={ing.ingredient_name} onClick={removeIngredient}/>
								))}
								<AddIngredientBulle onClick={() => setShow(true)}/>
							</div>
						</div>

						{/***********************/
						/* INFORMATION GENERALE */
						/************************/}

						<div className={style.infoGene}>
							<TextFieldSecondaire 
								placeholder={Recipe.placeholder.tmpPrep} 
								icon={<CookTimeIcon />} 
								onChange={(value) => saveRecipe("recipe_preparation_time",value)} 
							/>
							<TextFieldSecondaire 
								placeholder={Recipe.placeholder.tmpCooking} 
								icon={<CookingTimeIcon />}
								onChange={(value) => saveRecipe("recipe_cooking_time",value)} 
							/>
							<div className={style.row}>
								<TextFieldSecondaire 
									placeholder={Recipe.placeholder.difficult} 
									icon={<DifficultIcon />} 
									onChange={(value) => saveRecipe("recipe_difficult",value)}
								/>
								<TextFieldSecondaire 
									placeholder={Recipe.placeholder.nbPersonne} 
									icon={<PeopleIcon />} 
									onChange={(value) => saveRecipe("recipe_nbPersonne",value)}
								/>
							</div>
						</div>	
					</div>
				</div>
	
			</div>


			{/***********************/
			/* ETAPES DE LA RECETTE */
			/************************/}

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