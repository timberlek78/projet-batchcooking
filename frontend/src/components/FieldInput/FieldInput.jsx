import style from "../../pages/Users/users.module.css";

/**
 * Champ de formulaire réutilisable
 * @param {string} type - type input
 * @param {string} placeholder
 * @param {function} onChange
 * @param {ReactNode} rightIcon - bouton/icône à droite (optionnel)
 * @param {string} error - message d'erreur
 */
function FieldInput({ type = "text", placeholder, onChange, rightIcon, error }) {
    return (
        <div className={style.attribut}>
            <div className={style.field}>
                <input
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {rightIcon && rightIcon}
            </div>
            <div className={style.errorSlot}>
                {error}
            </div>
        </div>
    );
}

export default FieldInput;
