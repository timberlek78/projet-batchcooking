import CookTimeIcon from '../../../../assets/icons/recipes/add/cook-time.svg?react';
import style from '../recipeGlobal.module.css';

function Bulle({info, icon})
{
	return (
		<div className={`${style.bulle}`}>
			<span className={style.icon}>{icon}</span>
			<div className={style.text}>{info}</div>
		</div>
	);
}

export default Bulle