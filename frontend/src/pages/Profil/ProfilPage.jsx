import { useEffect, useState } from "react";
import style from './style/profil.module.css';
import {getUserId,update} from '../../services/user.service.js';

import OngletInfo from "./onglet/OngletInfo.jsx";
import OngletRecipe from "./onglet/OngletRecipe.jsx";
import { useParams } from "react-router-dom";

function ProfilPage()
{
	const { ongletDefault } = useParams();
	const user_id = localStorage.getItem('user_id');
	const [user, setUser] = useState(null);
	const [onglet, setOnglet] = useState(1);

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

	useEffect(() => {
		if (ongletDefault) setOnglet(Number(ongletDefault));
	}, [ongletDefault]);

	console.log("aaa" ,ongletDefault);
	if (!user) return <p>Chargement...</p>;
	return (
		<>
			<div className={style.row}>
				<div className={`${style.container} ${style.menu}`}>
					<button className={`${style.menuItem} ${onglet === 1 ? style.actif : ''}`} onClick={() => setOnglet(1)}>Information générale</button>
					<button className={`${style.menuItem} ${onglet === 2 ? style.actif : ''}`} onClick={() => setOnglet(2)}>Mes recettes</button>
				</div>

				<div className={`${style.container} ${style.info}`}>
					{onglet === 1 && (
						<OngletInfo user={user} onValid={onValid}/>
					)}

					{onglet === 2 && (
						<OngletRecipe />
					)}
			</div>
			</div>
		</>
	);
}

export default ProfilPage;