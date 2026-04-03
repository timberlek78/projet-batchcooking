import style from './styles/bulle.module.css';
import OvaleRempli from '../../../../assets/icons/recipes/view/ovale-rempli.svg?react';
import OvaleVide from '../../../../assets/icons/recipes/view/ovale-vide.svg?react';
import DifficultIcon from '../../../../assets/icons/recipes/view/difficult.svg?react';
import { use, useState } from 'react';

function SelectDifficult({ difficult, onDifficultChange }) {
	const [hovered, setHovered] = useState(null);

	console.log("diff", difficult);
	return (
		<div className={`${style.row}`}>
			<DifficultIcon />
			<div className={style.bulle} onMouseLeave={() => setHovered(null)}>
				{[1, 2, 3, 4].map((index) => (
					index <= (hovered ?? difficult)
						? <OvaleRempli key={index} onMouseEnter={() => setHovered(index)} onClick={() => onDifficultChange(index)} />
						: <OvaleVide key={index} onMouseEnter={() => setHovered(index)} onClick={() => onDifficultChange(index)} />
				))}
			</div>
		</div>
	);
}


export default SelectDifficult;