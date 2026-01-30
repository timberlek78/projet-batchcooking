import style from './IngredientBulle.module.css';
import root from './bulle.module.css';
import DeleteIcon from '../../../../assets/icons/recipes/add/close.svg?react';

function IngredientBulle({ ingredient, onClick, onChange }) {
	return (
		<div id="bulle"className={`${root.bulle} ${style.bulleText}`}>
			<input
				type="number"
				className={style.qte}
				placeholder="Qte"
				value={ingredient.qte ?? ""}
				onChange={(e) =>
					onChange(ingredient.ingredient_id, e.target.value)
				}
				style={{
					width: `${Math.max(
						String(ingredient.qte ?? "").length,
						3
					)}ch`,
				}}
			/>

			<span className={style.unit}>
				{ingredient.ingredient_unit}
			</span>

			<div className={style.text}>
				{ingredient.ingredient_name}
			</div>
			<span onClick={() => onClick(ingredient.ingredient_id)}>
				<DeleteIcon />
			</span>
		</div>
	);
}



export default IngredientBulle