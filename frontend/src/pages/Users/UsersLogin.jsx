import { useEffect, useState } from "react";
import style from "./users.module.css";
import text from "../../constants/pages/users/Users.js";
import Button from "../../components/Button/Button/Button.jsx";
import {login} from '../../services/user.service.js';

import RegisterIcon from "../../assets/icons/login/login.svg?react";
import PasswordStrength from "../../components/passwordStrength/PasswordStrength.jsx";

import EyeOpenIcon from "../../assets/icons/login/eye-open.svg?react";
import EyeCloseIcon from "../../assets/icons/login/eye-close.svg?react";
import Users from "../../constants/pages/users/Users.js";

function UsersLogin({hasAccount})
{
	const [users, setUser] = useState({
			email : "",
			password : "",
		});
		const [showPassword, setShowPassword] = useState(false);
	
		const [errors, setError] = useState({
			email : "",
			password : "",
		});
	
		useEffect(() => {
			console.log(users);
		}, [users]);
	
		const onChange = (attribut, valeur) => {
			setError({
				email : "",
				password : ""
			});
	
	
			setUser(prev => ({
				...prev,
				[attribut]: valeur
			}));
		};
	
		const verifField = () => {
			const err = {
				email: "",
				password: ""
			};

			let hasError = false;		
	
			if(!users.email){
				err['email'] = text.error.email;
				hasError = true;
			}
	
			if(!users.password){
				err['password'] = text.error.mdpMissing;
				hasError = true;
			}
			console.log("alooo");
			setError(err);
			return !hasError;
	
		}
	
		const handleLogin = async () => {
			if (!verifField()) return;
			console.log("alooo");

			try {
				const response = await login({
					email: users.email,
					password: users.password
				});
	
				if (response) {
					alert("Connected 🎉");
					console.log(response);

					localStorage.setItem('token', response.data.token);
				}
			} catch (error) {
				console.error(error);
			}
		};
	

	return (
		<div className={style.content}>
				<div className={style.gauche}>
					<div className={style.haut}>
						<div className={style.titre}>
							<b>{text.Titre}</b>
						</div>
						<div className={style.desc}>{text.Description}</div>
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
									onChange={e => onChange("password", e.target.value)}

									placeholder={text.placeholder.mdp}
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

							<div className={style.errorSlot}>
								{errors.mdp}
							</div>
						</div>
					</div>
						<Button
							text="Se connecter"
							icons={<RegisterIcon />}
							onClick={handleLogin}
						/>
						<button className={style.hasAccount} onClick={hasAccount}>{Users.message.hasNoAccount}</button>
					</div>

				<div className={style.droite} />
			</div>
	)
}

export default UsersLogin