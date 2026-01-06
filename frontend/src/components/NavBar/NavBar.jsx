import style from './navBar.module.css';

function Navbar() {
	return (
		<div className={style.container}>
			<h1 className={style.logo}>Miaminou</h1>
			<ul>
				<a className={style.lien} href="/">
					Test connection
				</a>
				<a className={style.lien} href="/recipes">
					Recette
				</a>
				<a className={style.lien} href="/users">
					Users
				</a>
			</ul>
		</div>
	);
}

export default Navbar;
