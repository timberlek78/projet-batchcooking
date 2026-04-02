import { useEffect, useState } from "react";
import style from './style/profil.module.css';
import {getUserId,update} from '../../services/user.service.js';
import ProfilInput from "../../components/FieldInput/ProfilInput.jsx";

import UsersIcons from '../../assets/icons/home/profil.svg?react';
import EmailIcons from '../../assets/icons/profil/email.svg?react';
import LockIcons from '../../assets/icons/profil/lock.svg?react';

function ProfilPage()
{
	const user_id = localStorage.getItem('user_id');
	const [user, setUser] = useState(null);

	useEffect(() => {
		const load = async () => {
			const res = await getUserId(user_id);
			if (res) setUser(res.data);
		};
		load();
	}, []);

	const onValid = (key, value) => {
		const res = update( user_id, {[key]: value });
	};

	if (!user) return <p>Chargement...</p>;
	return (
		<>
			<div className={style.row}>
				<div className={`${style.container} ${style.menu}` }>
					<div className={`${style.menuItem}`}>Information générale</div>
					<div className={`${style.menuItem}`}>Mes recettes</div>
				</div>

				<div className={`${style.container} ${style.info}`}>
					<ProfilInput name={"Nom d'utilisateur"} icon={<UsersIcons />} value={user.username} onValid={(value) => onValid("username", value)}/>
					<ProfilInput name={"Adresse mail"} icon={<EmailIcons />} value={user.email} onValid={(value) => onValid("email", value)}/>
					<ProfilInput name={"Mot de passe"} icon={<LockIcons />} password={true} value={"votre_mot_de_passe"} onValid={(value) => onValid("password", value)}/>
				</div>
			</div>
		</>
	);
}

export default ProfilPage;