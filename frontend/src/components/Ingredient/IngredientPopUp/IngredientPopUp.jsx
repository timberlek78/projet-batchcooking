import style from './popup.module.css';

function IngredientPopUp({ show, onClose }) {
	if (!show) return null;

	const stop = (e) => e.stopPropagation();

	return (
		<div className={style.overlay} onClick={onClose}>
			<div className={style.PopUp} onClick={stop}>
				<p>Ceci est un popUp test</p>
			</div>
		</div>
	);
}

export default IngredientPopUp;
