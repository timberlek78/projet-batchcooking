import style from './IngredientBulle.module.css';

function IngredientBulle({ingredientName})
{
    return(
        <div className={style.bulle}>
            <div className={style.text}>{ingredientName}</div>
            <button className={style.btn}>X</button>
        </div>
    )
}


export default IngredientBulle