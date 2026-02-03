import style from './textfield.module.css';
import React from 'react';


function TextFieldSecondaire({placeholder,value, icon, onChange})
{
	return (
		<div className={style.global}>
			{icon}
			<input onChange={(e)=>onChange(e.target.value)} className={style.textfield} value={value} type="text" placeholder={`${placeholder}`}></input>
		</div>
	)
}

export default TextFieldSecondaire