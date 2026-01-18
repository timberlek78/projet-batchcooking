import style from './Stepes.module.css';
import TrashIcon from '../../../assets/icons/recipes/add/trash.svg?react';
import Recipe from '../../../constants/pages/recipes/AddRecipe.js';

function Stepes({ id, numero, placeholder, onRemove,onChange }) {
	return (
		<div className={style.stepes}>
			<div className={style.row}>
				<input
					className={style.stepeName}
					type="text"
					placeholder={placeholder}
					onChange={(e) => onChange("name", e.target.value)}
				/>

				<button
					className={style.btn}
					onClick={() => onRemove(id ?? numero)}
				>
					<TrashIcon />
				</button>
			</div>

			<textarea
				className={style.stepeContent}
				placeholder={Recipe.placeholder.Stepes}
				onInput={(e) => {
					e.target.style.height = "auto";
					e.target.style.height = `${e.target.scrollHeight}px`;
				}}
				onChange={(e) => onChange("content", e.target.value)}
			/>

			<hr />
		</div>
	);
}


export default Stepes;