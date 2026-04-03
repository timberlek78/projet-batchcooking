import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import style from './MenuProfil.module.css';
import TITLE from "../../constants/title";

import UsersIcons from '../../assets/icons/home/profil.svg?react';
import { disconnect, isConnected } from "../../utils/authUtils";


function MenuProfil({user, items}) {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const connected = isConnected();

	const handleClick = (e, item) => {
		e.stopPropagation();
		if (item.path) navigate(item.path);
		if (item.action) item.action();
	};

	console.log(user);

	const content = connected ? user.username : TITLE.Users;

	return (
		<div
			className={`${style.profil} ${isOpen ? (connected ? style.profilOpenConnected : style.profilOpenGuest) : ""}`}
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
			onClick={() => navigate(connected ? '/profil/1' : '/users/login')}
		>
			<UsersIcons />

			{isOpen && content}

			{isOpen && connected && (
				<div className={`${style.menu} ${isOpen ? style.menuOpen : ''}`}>
					{items.map((item) => (
						<button
							key={item.id}
							className={style.item}
							onClick={() => handleClick(item)}
						>
							{item.text}
						</button>
					))}
				</div>
			)}
		</div>
	);
}


export default MenuProfil;