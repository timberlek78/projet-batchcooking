import style from './navBar.module.css';
import TITLE from '../../constants/title.js';
import { DROPDOWN_ITEMS } from '../../constants/title.js';
import { useLocation, Navigate } from 'react-router-dom';
import { isConnected } from '../../utils/authUtils.jsx';
import { useEffect, useState } from "react";
import {getUserId} from '../../services/user.service.js';

import MenuProfil from '../../features/profils/MenuProfil.jsx';

function Navbar() {
	const user_id = JSON.parse(localStorage.getItem('user_id'));
	const location = useLocation();

	const [user, setUser] = useState(null);
	
	useEffect(() => {
		const load = async () => {
			const user = localStorage.getItem("user");
			if (user) setUser(user);
		};
		load();
	}, []);

	const tout = Object.fromEntries(
		Object.keys(localStorage).map(key => [key, localStorage.getItem(key)])
	);

	console.log(tout);
	// localStorage.removeItem('user');
	// localStorage.removeItem('token');
	// localStorage.removeItem('miaminou_add_recipe_draft');
	// localStorage.removeItem('user_id');

	return (
		<div className={style.container}>
			<h1 className={style.logo}>Miaminou</h1>
			<ul className={style.action}>

				<a className={`${style.lien} ${location.pathname === '/recipes' ? style.actif : ''}`} href="/recipes" >
					{TITLE.Recipe}
				</a>
				<a className={`${style.lien} ${location.pathname === '/week' ? style.actif : ''}`} href="/week">
					{TITLE.Week}
				</a>
			</ul>
			<div className={style.droite}>
				<MenuProfil items = {DROPDOWN_ITEMS} user={ user} isConnected={isConnected()} />
			</div>
		</div>
	);
}

export default Navbar;
