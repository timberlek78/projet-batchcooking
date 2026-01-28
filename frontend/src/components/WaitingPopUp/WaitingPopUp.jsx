import { useEffect } from 'react';
import style from './waitingPopUp.module.css';

export default function WaitingPop({show,status = "loading",message,onClose}) {

	if (!show) return null;

	const getMessage = () => {
		if (message) return message;

		switch (status) {
			case "success":
				return "La recette a bien été créée ✅";
			case "error":
				return "Une erreur est survenue ❌";
			default:
				return "Chargement en cours...";
		}
	};

	return (
		<div className={style.overlay} onClick={onClose}>
			<div className={`${style.popup} ${style[status]}`}>
				{status === "loading" && <div className={style.loader} />}
				{status === "success" && <div className={style.successIcon}>✓</div>}
				{status === "error" && <div className={style.errorIcon}>✕</div>}

				<p className={style.message}>{getMessage()}</p>
			</div>
		</div>
	);
}
