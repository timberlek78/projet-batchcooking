import { useNavigate } from 'react-router-dom';
import style from './addButton.module.css';
import addIconUrl from '../../../assets/icons/components/add.svg';
import React from 'react';


function AddButton({ routes }) {
	const navigate = useNavigate();

	const add = (e) => {
		e.stopPropagation();
		navigate(routes);
	};

	return (
		<button className={style.button} onClick={add} type="button">
			<img className={style.icon} src={addIconUrl} alt="Ajouter" />
		</button>
	);
}

export default AddButton;
