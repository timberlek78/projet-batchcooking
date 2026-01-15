import { useEffect, useMemo, useState } from 'react';
import style from './popup.module.css';
import { getIngredients } from '../../../../services/ingredients.service.js';
import RechercheField from '../../../Recherche/RechercheField.jsx';

function IngredientPopUp({show,onClose,addIng,selectedIngredients = []}) {
	const [ingredients, setIngredients] = useState([]);
	const [search, setSearch] = useState('');
	const [error, setError] = useState(null);

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

	const selectedIds = useMemo(() => {
		return new Set((selectedIngredients ?? []).map((i) => i.ingredient_id));
	}, [selectedIngredients]);

	const filteredIngredient = useMemo(() => {
		const s = search.toLowerCase();
		return ingredients.filter((ing) =>
			(ing.ingredient_name ?? '').toLowerCase().startsWith(s)
		);
	}, [ingredients, search]);

	if (!show) return null;

	const stop = (e) => e.stopPropagation();

	const toggleIngredient = (ing) => {
		const isChecked = selectedIds.has(ing.ingredient_id);
		addIng(ing, !isChecked);
	};

	return (
		<div className={style.overlay} onClick={onClose}>
			<div className={style.PopUp} onClick={stop}>
				<RechercheField onSearch={setSearch} />

				{error && <p>Erreur : {error.message}</p>}

				<div className={style.PopUpContent}>
					{filteredIngredient.map((ing) => {
						const isChecked = selectedIds.has(ing.ingredient_id);

						return (
							<div
								key={ing.ingredient_id}
								className={style.ingredient}
								role="checkbox"
								aria-checked={isChecked}
								tabIndex={0}
								onClick={() => toggleIngredient(ing)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										toggleIngredient(ing);
									}
								}}
							>
								<span>{ing.ingredient_name}</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default IngredientPopUp;
