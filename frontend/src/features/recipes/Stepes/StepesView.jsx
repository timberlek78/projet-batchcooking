import style from './stepesView.module.css'

function StepesView({stepe})
{   
    const name = stepe.stepes_name === "" ? `Etape ${stepe.stepes_number}` : stepe.stepes_name ;

    return (
        <div className={style.stepe}>
            <div className={style.name}>{name}</div>
            <div className={style.text}>
                {stepe.stepes_desc}
            </div>

            <hr />
        </div>
    )
}

export default StepesView