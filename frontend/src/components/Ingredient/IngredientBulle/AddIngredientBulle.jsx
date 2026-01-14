import style from './AddIngredientBulle.module.css';
import AddIconUrl from '../../../assets/icons/components/add.svg?react';

function AddIngredientBulle({onClick})
{
	return(
		<div className={style.bulle} onClick={onClick}>
			<span className={style.icon}>
				<AddIconUrl />
			</span>
		</div>
	)
}



export default AddIngredientBulle