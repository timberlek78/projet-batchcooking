import TextFieldSecondaire from '../../components/TextField/Secondaire/TextFieldSecondaire.jsx'
import TextFieldPrincipal from '../../components/TextField/Principale/TextFieldPrincipal.jsx'
import style from './style/add.module.css'
import CookTimeIcon from '../../assets/icons/recipes/add/cook-time.svg?react';
import CookingTimeIcon from '../../assets/icons/recipes/add/baker.svg?react';
import DifficultIcon from '../../assets/icons/recipes/add/dumbbell.svg?react';
import PeopleIcon from '../../assets/icons/recipes/add/people.svg?react';
import Recipe from '../../constants/pages/recipes/AddRecipe.js'

function AddRecipePage()
{
	return(
		<div className={style.page}>
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
							<ul>
								<li>ahahaha</li>
								<li>ahahaha</li>
								<li>ahahaha</li>
								<li>ahahaha</li>
								<li>ahahaha</li>
							</ul>
						</div>
						<div className={style.infoGene}>
							{console.log(Recipe.placeholder.tmpPrep)}
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