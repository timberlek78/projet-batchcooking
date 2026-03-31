import { useState } from "react";
import style from "./users.module.css";
import text from "../../constants/pages/users/Users.js";
import Button from "../../components/Button/Button/Button.jsx";
import { create } from "../../services/user.service.js";
import FieldInput from "../../components/FieldInput/FieldInput.jsx";
import PasswordStrength from "../../components/passwordStrength/PasswordStrength.jsx";

import RegisterIcon from "../../assets/icons/login/login.svg?react";
import EyeOpenIcon from "../../assets/icons/login/eye-open.svg?react";
import EyeCloseIcon from "../../assets/icons/login/eye-close.svg?react";

const numberRegex  = /[0-9]/;
const majRegex     = /[A-Z]/;
const minRegex     = /[a-z]/;
const specialRegex = /[^a-zA-Z0-9]/;
const emailRegex   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function UsersRegister({ hasAccount }) {
    const [users, setUser] = useState({ username: "", email: "", mdp: "", confirm: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [showStrength, setShowStrength] = useState(false);
    const [renderStrength, setRenderStrength] = useState(false);
    const [level, setLevel] = useState(0);
    const [errors, setError] = useState({ username: "", email: "", mdp: "", confirm: "" });

    const resetErrors = () => setError({ username: "", email: "", mdp: "", confirm: "" });

    const onChange = (attribut, valeur) => {
        resetErrors();
        setUser(prev => ({ ...prev, [attribut]: valeur }));
    };

    const onChangeMdp = (attribut, valeur) => {
        const newLevel = [numberRegex, majRegex, minRegex, specialRegex]
            .filter(r => r.test(valeur)).length;
        setLevel(newLevel);
        onChange(attribut, valeur);
    };

    const verifField = () => {
        const err = { username: "", email: "", mdp: "", confirm: "" };
        let hasError = false;

        if (!users.username)                          { err.username = text.error.username;       hasError = true; }
        if (!users.email || !emailRegex.test(users.email)) { err.email = text.error.email;        hasError = true; }
        if (!users.mdp)                               { err.mdp = text.error.mdpMissing;          hasError = true; }
        else if (level <= 2)                          { err.mdp = text.error.mdp;                 hasError = true; }
        if (!users.confirm)                           { err.confirm = text.error.confirmMissing;  hasError = true; }
        else if (users.confirm !== users.mdp)         { err.confirm = text.error.confirm;         hasError = true; }

        setError(err);
        return !hasError;
    };

    const register = async () => {
        if (!verifField()) return;

        try {
            const response = await create({
                username: users.username,
                email: users.email,
                password: users.mdp,
            });
            if (response) hasAccount();
        } catch (error) {
            console.error(error);
        }
    };

    const eyeButton = (show, toggle) => (
        <button
            type="button"
            className={style.rightIcon}
            onMouseDown={e => e.preventDefault()}
            onClick={() => toggle(prev => !prev)}
        >
            {show ? <EyeOpenIcon /> : <EyeCloseIcon />}
        </button>
    );

    return (
        <div className={style.content}>
            <div className={style.haut}>
                <div className={style.titre}><b>{text.Titre}</b></div>
                <div className={style.desc}>{text.Description}</div>
            </div>

            <div className={style.formulaire}>
                <FieldInput
                    placeholder={text.placeholder.username}
                    onChange={e => onChange("username", e.target.value)}
                    error={errors.username}
                />

                <FieldInput
                    type="email"
                    placeholder={text.placeholder.email}
                    onChange={e => onChange("email", e.target.value)}
                    error={errors.email}
                />

                {/* Mot de passe avec indicateur de force */}
                <div className={style.attribut}>
                    <div className={style.field}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder={text.placeholder.mdp}
                            onChange={e => onChangeMdp("mdp", e.target.value)}
                            onFocus={() => { setRenderStrength(true); setShowStrength(true); }}
                            onBlur={() => { setShowStrength(false); setRenderStrength(false); }}
                        />
                        {eyeButton(showPassword, setShowPassword)}
                    </div>
                    {renderStrength && (
                        <div className={style.strengthSlot}>
                            <PasswordStrength level={level} className={showStrength ? "show" : "hide"} />
                        </div>
                    )}
                    <div className={style.errorSlot}>{errors.mdp}</div>
                </div>

                <FieldInput
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder={text.placeholder.confirm ?? text.placeholder.mdp}
                    onChange={e => onChangeMdp("confirm", e.target.value)}
                    rightIcon={eyeButton(showPasswordConfirm, setShowPasswordConfirm)}
                    error={errors.confirm}
                />
            </div>

            <Button text="S'inscrire" icons={<RegisterIcon />} onClick={register} />
            <button className={style.hasAccount} onClick={hasAccount}>
                {text.message.hasAccount}
            </button>
        </div>
    );
}

export default UsersRegister;
