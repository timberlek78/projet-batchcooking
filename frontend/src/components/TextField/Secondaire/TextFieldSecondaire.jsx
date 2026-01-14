import style from './textfield.module.css';
import React from 'react';


function TextFieldSecondaire({placeholder, icon})
{
	return (
		<div className={style.global}>
			{icon}
			<input className={style.textfield} type="text" placeholder={`${placeholder}`}></input>
		</div>
	)
}

export default TextFieldSecondaire