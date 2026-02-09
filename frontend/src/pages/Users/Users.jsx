import { useEffect, useState } from "react";
import style from "./users.module.css";
import text from "../../constants/pages/users/Users.js";
import Button from "../../components/Button/Button/Button.jsx";
import {create} from '../../services/user.service.js';

import RegisterIcon from "../../assets/icons/login/login.svg?react";
import PasswordStrength from "../../components/passwordStrength/PasswordStrength.jsx";

import EyeOpenIcon from "../../assets/icons/login/eye-open.svg?react";
import EyeCloseIcon from "../../assets/icons/login/eye-close.svg?react";

function Users() {
	const [users, setUser] = useState({
		username : "",
		email : "",
		mdp : "",
		confirm : ""
	});
	const [showStrength, setShowStrength] = useState(false);
	const [renderStrength, setRenderStrength] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [level, setLevel] = useState(0);

	const [errors, setError] = useState({
		username : "",
		email : "",
		mdp : "",
		confirm : ""
	});

	// Regex règles mot de passe
	const numberRegex = /[0-9]/;
	const majRegex = /[A-Z]/;
	const minRegex = /[a-z]/;
	const specialRegex = /[^a-zA-Z0-9]/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


	useEffect(() => {
		console.log(users);
	}, [users]);

	const onChange = (attribut, valeur) => {
		setError({
			username : "",
			email : "",
			mdp : "",
			confirm : ""
		});


		setUser(prev => ({
			...prev,
			[attribut]: valeur
		}));
	};

	const onChangeMdp = (attribut, valeur) => {
		let newLevel = 0;

		if (numberRegex.test(valeur)) newLevel++;
		if (majRegex.test(valeur)) newLevel++;
		if (minRegex.test(valeur)) newLevel++;
		if (specialRegex.test(valeur)) newLevel++;

		setLevel(newLevel);
		onChange(attribut, valeur);
	};

	const verifField = () => {
		const err = {
			username: "",
			email: "",
			mdp: "",
			confirm: ""
		};
		let hasError = false;		

		if(!users.username){
			err['username'] = text.error.username;
			hasError = true;
		}

		if(!users.email ||!emailRegex.test(users.email)){
			err['email'] = text.error.email;
			hasError = true;
		}

		if(!users.mdp){
			err['mdp'] = text.error.mdpMissing;
			hasError = true;
		}

		if(users.mdp && level <= 1){
			err['mdp'] = text.error.mdp;
			hasError = true;
		}

		if(!users.confirm){
			err['confirm'] = text.error.confirmMissing;
			hasError = true;
		}
		console.log(users.confirm === users.mdp)
		if(users.confirm === users.mdp){
			err['confirm'] = text.error.confirm;
			hasError = true;
		}

		setError(err);
		return !hasError;

	}

	const register = async () => {
		if (!verifField()) return;

		try {
			const response = await create({
				username: users.username,
				email: users.email,
				password: users.mdp
			});

			if (response) {
				alert("Compte créé avec succès 🎉");
				// TODO: redirect login
			}
		} catch (error) {
			console.error(error);
		}
	};


	return (
		<div className={style.login_wrap}>
			<div className={style.content}>
				<div className={style.gauche}>
					<div className={style.haut}>
						<div className={style.titre}>
							<b>{text.Titre}</b>
						</div>
						<div className={style.desc}>{text.Description}</div>
					</div>

					{/* Username */}
					<div className={style.attribut}>
						<div className={style.field}>
							<input
								placeholder={text.placeholder.username}
								onChange={e => onChange("username", e.target.value)}
							/>
						</div>
						<div className={style.errorSlot}>
							{errors.username}
						</div>
					</div>

					{/* Email */}
					<div className={style.attribut}>
						<div className={style.field}>
							<input
								type={"email"}
								placeholder={text.placeholder.email}
								onChange={e => onChange("email", e.target.value)}
							/>
						</div>
						<div className={style.errorSlot}>
							{errors.email}
						</div>
					</div>
					{/** Mot de passe */}
					<div className={style.attribut}>
						<div className={style.passwordWrap}>
							<div className={style.field}>
								<input
									type={showPassword ? "text" : "password"}
									placeholder={text.placeholder.mdp}
									onChange={e => onChangeMdp("mdp", e.target.value)}
									onFocus={() => {
										setRenderStrength(true);
										setShowStrength(true);
									}}
									onBlur={() => {
										setShowStrength(false);
										setRenderStrength(false);
									}}
								/>

								<button
									type="button"
									className={style.rightIcon}
									onMouseDown={e => e.preventDefault()}
									onClick={() => setShowPassword(prev => !prev)}
								>
									{showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
								</button>
							</div>

							<div className={style.strengthSlot}>
								{renderStrength && (
									<PasswordStrength
										level={level}
										className={showStrength ? "show" : "hide"}
									/>
								)}
							</div>

							<div className={style.errorSlot}>
								{errors.mdp}
							</div>
						</div>
					</div>

					{/** CONFIRMATIONNNNN */}
					<div className={style.attribut}>
						<div className={style.field}>
							<input
								type={showPasswordConfirm ? "text" : "password"}
								placeholder={text.placeholder.mdp}
								onChange={e => onChangeMdp("mdp", e.target.value)}
							/>

							<button
								type="button"
								className={style.rightIcon}
								onMouseDown={e => e.preventDefault()}
								onClick={() => setShowPasswordConfirm(prev => !prev)}
							>
								{showPasswordConfirm ? <EyeOpenIcon /> : <EyeCloseIcon />}
							</button>
						</div>
							<div className={style.errorSlot}>
								{errors.confirm}
							</div>

						
						</div>
						<Button
							text="S'inscrire"
							icons={<RegisterIcon />}
							onClick={register}
						/>
					</div>

				<div className={style.droite} />
			</div>
		</div>
	);
}

export default Users;
