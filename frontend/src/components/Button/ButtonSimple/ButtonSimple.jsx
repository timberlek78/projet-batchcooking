import style from './simple.module.css';

function ButtonSimple({ icon,onClick }) {
   
    return (
        <button className={style.button} onClick={onClick} type="button">
            {icon}
        </button>
    );
}

export default ButtonSimple;
