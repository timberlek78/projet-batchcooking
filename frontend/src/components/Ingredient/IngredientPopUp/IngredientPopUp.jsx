import { useEffect, useState } from 'react';
import style from './popup.module.css';
import { getIngredients }from '../../../services/ingredients.service.js';
import RechercheField from '../../Recherche/RechercheField.jsx';


function IngredientPopUp({ show, onClose,addIng }) {
	
	const [ingredients,setIngredients] = useState([]);
	const [search,setSearch] = useState('');
	const [error, setError] = useState();
	
	useEffect(() => {
		if (!show) return;

		let cancelled = false;

		const fetchIngredient = async () => {
			try {
				const response = await getIngredients();
				if (!cancelled) setIngredients(response.data);
			} catch (err) {
				if (!cancelled) setError(err);
				console.log(err);
			}
		};

		fetchIngredient();

		return () => {
			cancelled = true;
		};
	}, [show]);

	if (!show) return null;
	const stop = (e) => e.stopPropagation();


	const filteredIngredient = ingredients.filter((ing) => ing.ingredient_name.toLowerCase().startsWith(search.toLowerCase()));
	return (
		<div className={style.overlay} onClick={onClose}>
			<div className={style.PopUp} onClick={stop}>

				<RechercheField onSearch={setSearch}/>

				<div className={style.PopUpContent}>
				{
					filteredIngredient.map((ing)=>(
						<div key={ing.ingredient_id} className={style.ingredient}>
							<input id={`${ing.ingredient_id}`} type="checkbox" onChange={(e) => addIng(ing,e.target.checked)} />
							<label htmlFor={`${ing.ingredient_id}`}>{ing.ingredient_name}</label>
						</div>
					))
				}
				
				</div>
			</div>
		</div>
	);
}

export default IngredientPopUp;
