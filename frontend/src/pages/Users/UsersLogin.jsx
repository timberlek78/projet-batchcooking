import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./users.module.css";
import text from "../../constants/pages/users/Users.js";
import Button from "../../components/Button/Button/Button.jsx";
import FieldInput from "../../components/FieldInput/FieldInput.jsx";
import { login } from "../../services/user.service.js";

import RegisterIcon from "../../assets/icons/login/login.svg?react";
import EyeOpenIcon from "../../assets/icons/login/eye-open.svg?react";
import EyeCloseIcon from "../../assets/icons/login/eye-close.svg?react";

function UsersLogin({ hasAccount }) {
    const [users, setUser] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setError] = useState({ email: "", password: "", login: "" });

    const navigate = useNavigate();

    const resetErrors = () => setError({ email: "", password: "", login: "" });

    const onChange = (attribut, valeur) => {
        resetErrors();
        setUser(prev => ({ ...prev, [attribut]: valeur }));
    };

    const verifField = () => {
        const err = { email: "", password: "" };
        let hasError = false;

        if (!users.email) { err.email = text.error.email; hasError = true; }
        if (!users.password) { err.password = text.error.mdpMissing; hasError = true; }

        setError(err);
        return !hasError;
    };

    const handleLogin = async () => {
        if (!verifField()) return;

        try {
            const response = await login({ email: users.email, password: users.password });

            if (response) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", response.data.user);
                navigate("/recipes");
            }
        } catch {
            setError({ login: text.error.loginFailed });
        }
    };

    const EyeToggle = (
        <button
            type="button"
            className={style.rightIcon}
            onMouseDown={e => e.preventDefault()}
            onClick={() => setShowPassword(prev => !prev)}
        >
            {showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
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
                    type="email"
                    placeholder={text.placeholder.email}
                    onChange={e => onChange("email", e.target.value)}
                    error={errors.email}
                />

                <FieldInput
                    type={showPassword ? "text" : "password"}
                    placeholder={text.placeholder.mdp}
                    onChange={e => onChange("password", e.target.value)}
                    rightIcon={EyeToggle}
                    error={errors.password}
                />

                <div className={style.errorSlot}>{errors.login}</div>
            </div>

            <Button text="Se connecter" icons={<RegisterIcon />} onClick={handleLogin} />
            <button className={style.hasAccount} onClick={hasAccount}>
                {text.message.hasNoAccount}
            </button>
        </div>
    );
}

export default UsersLogin;
