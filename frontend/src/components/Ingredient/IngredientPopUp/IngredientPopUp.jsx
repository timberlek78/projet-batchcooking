import style from './popup.module.css'

function IngredientPopUp({show})
{
    if(!show) {return null};

    return(
        <div className={style.PopUp}>
            <p>Ceci est un popUp test</p>
        </div>
    )
}

export default IngredientPopUp;