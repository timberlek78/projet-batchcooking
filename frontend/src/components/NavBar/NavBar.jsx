import style from './navBar.module.css';
import TITLE from '../../constants/title.js';
import { DROPDOWN } from '../../constants/title.js';
import UsersIcons from '../../assets/icons/home/profil.svg?react';

import { useLocation, Navigate } from 'react-router-dom';

function Navbar() {
	const user = localStorage.getItem('user');
	const location = useLocation();

	if (!user) {
		return <Navigate to="/users/login" replace />;
	}

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
			<div className={style.dropdown}>
				<div className={`${style.trigger}` }>
					<UsersIcons />
					{user.username}
				</div>
				<div className={style.menu}>
					<button className={style.item}>{DROPDOWN.disconnect}</button>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
