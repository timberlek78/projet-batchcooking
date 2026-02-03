import style from './listIngredient.module.css';
import IngredientIcon from '../../../../assets/icons/recipes/view/ing.svg?react';
import CarrotIcon from '../../../../assets/icons/recipes/view/carot.svg?react';

import PersonneIcon from '../../../../assets/icons/recipes/add/people.svg?react';
import { useState } from 'react';

function ListIngredient({ingredient})
{
	const [personne, setPersonne] = useState(1);



	return (
		<div className={style.list}>
			<div className={style.row}>
				<div className={style.titre}>
					<CarrotIcon />
					<div>Liste Ingrédient</div>
				</div>
				<div className={style.personne}>
					<PersonneIcon />
					<button className={style.btn} onClick={() => setPersonne(personne - 1)}> - </button>
					<div className={style.nbPersonne}>{personne}</div>
					<button className={style.btn} onClick={() => setPersonne(personne + 1)}> + </button>
				</div>
			</div>	

			<div className={style.listIngredient}>
				{
				ingredient.map((ing) => (
					<div key={ing.ingredient_id} className={style.ingredient}>
						<IngredientIcon />

						<div className={style.qte}>
							<div>{ing.quantity * personne}</div>
							<div>{ing.ingredient_unit}</div>
						</div>

						<div className={style.de}>de</div>

						<div className={style.name}>{(ing.ingredient_name).toLowerCase()}</div>
					</div>

				))
				}
			</div>

		</div>
	)
}

export default ListIngredient