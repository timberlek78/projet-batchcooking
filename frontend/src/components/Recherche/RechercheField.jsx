import React from 'react';
import style from './RechercheField.module.css';

function RechercheField({onSearch}) {

	const handleChange = (e) =>{
		e.stopPropagation();
		console.log("je suis la", e.target.value)
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

function search()
{
	console.log('aaa');
}

export default RechercheField;
