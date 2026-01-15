import style from './textfield.module.css';
import React from 'react';


function TextFieldSecondaire({placeholder, icon, onChange})
{
	return (
		<div className={style.global}>
			{icon}
			<input onChange={(e)=>onChange(e.target.value)} className={style.textfield} type="text" placeholder={`${placeholder}`}></input>
		</div>
	)
}

export default TextFieldSecondaire