import { useEffect, useState } from 'react';
import style from './popup.module.css';
import { getIngredients }from '../../../services/ingredients.service.js';
import RechercheField from '../../Recherche/RechercheField.jsx';


function IngredientPopUp({ show, onClose,addIng }) {
	
	const [ingredients,setIngredients] = useState([]);
	const [search,setSearch] = useState('');
	const [error, setError] = useState();
	const [checked, setChecked] = useState(false);
	
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

	const handleClick = (ing,e)=>{

		console.log(ing,e)
		addIng(ing,checked);

		setChecked(false);
	}
	return (
		<div className={style.overlay} onClick={onClose}>
			<div className={style.PopUp} onClick={stop}>

				<RechercheField onSearch={setSearch}/>

				<div className={style.PopUpContent}>
				{
					filteredIngredient.map((ing)=>(
						<div key={ing.ingredient_id} className={style.ingredient} aria-checked={checked} onClick={(e) => handleClick(ing,e)}>
							<label>{ing.ingredient_name}</label>
						</div>
					))
				}
				
				</div>
			</div>
		</div>
	);
}

export default IngredientPopUp;
