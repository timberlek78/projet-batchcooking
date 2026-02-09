import style from './textfield.module.css';
import React from 'react';


function TextFieldPrincipal({placeholder, value, icon,onChange, type = "text"})
{
    return (
        <div className={style.global}>
            {icon}
            <input 
            className={style.textfield} 
            value={value}
            onChange={(e)=>onChange(e.target.value)} 
            type={type} 
            placeholder={`${placeholder}`}></input>
        </div>
    )
}

export default TextFieldPrincipal