import style from './Stepes.module.css';
import TrashIcon from '../../../assets/icons/recipes/add/trash.svg?react';
import Recipe from '../../../constants/pages/recipes/AddRecipe.js';

function Stepes({ id, numero, name, content,placeholder, onRemove,onChange }) {
	return (
		<div className={style.stepes}>
			<div className={style.row}>
				<input
					className={style.stepeName}
					type="text"
					value={name}
					placeholder={placeholder}
					onChange={(e) => onChange("stepes_name", e.target.value)}
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
				value={content}
				onInput={(e) => {
					e.target.style.height = "auto";
					e.target.style.height = `${e.target.scrollHeight}px`;
				}}
				onChange={(e) => onChange("stepes_desc", e.target.value)}
			/>

			<hr />
		</div>
	);
}


export default Stepes;