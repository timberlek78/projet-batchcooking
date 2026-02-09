import style from './button.module.css';

function Button({text, onClick, icons})
{
    return (
        <button className={style.btn} onClick={onClick}>
            {icons}
            {text}
        </button>
    )
}

export default Button