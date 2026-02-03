import React from 'react';
import style from './RechercheField.module.css';

function RechercheField({onSearch}) {

	const handleChange = (e) =>{
		e.stopPropagation();
		onSearch(e.target.value);
	}

	return (
		<div className={style.searchWrapper}>
			<input
				className={style.search}
				type="search"
				placeholder="Rechercher..."
				onChange={handleChange}
			/>
			
			<span className={style.icon}>🔍</span>
		</div>
	);
}


export default RechercheField;
