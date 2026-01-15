import style from './textfield.module.css';
import React from 'react';


function TextFieldPrincipal({placeholder, icon,onChange})
{
    return (
        <div className={style.global}>
            {icon}
            <input className={style.textfield} onChange={(e)=>onChange(e.target.value)} type="text" placeholder={`${placeholder}`}></input>
        </div>
    )
}

export default TextFieldPrincipal