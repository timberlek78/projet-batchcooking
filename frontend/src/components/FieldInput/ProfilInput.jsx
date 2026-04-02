import ButtonSimple from "../Button/ButtonSimple/ButtonSimple.jsx"
import PencilIcons from "../../assets/icons/profil/pencil.svg?react";
import CheckIcons from "../../assets/icons/profil/check.svg?react";

import style from './style/profilInput.module.css';
import { useState } from "react";

function ProfilInput({ name, icon, value, onValid, password=false }) {
    const [editable, setEditable] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    return (
        <div className={style.columns}>
            <div className={`${style.titre}`}>
                <div className={style.icon}>{icon}</div>
                <div className={style.name}>{name}</div>
            </div>
            <div className={style.row}>
                <input
                    className={style.textField}
                    type={password && !editable ? "password" : "text"}
                    readOnly={!editable}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <ButtonSimple icon={editable ? <CheckIcons /> :  <PencilIcons /> } 
					onClick={ () => {
							if(!editable) {
								setEditable(true)
							} 
							else
							{
								onValid(inputValue);
								setEditable(false);
							}
						}
					} />
            </div>
        </div>
    );
}

export default ProfilInput