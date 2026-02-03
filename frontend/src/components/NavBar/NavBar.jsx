import style from './navBar.module.css';
import TITLE from '../../constants/title.js';

function Navbar() {
	return (
		<div className={style.container}>
			<h1 className={style.logo}>Miaminou</h1>
			<ul>
				<a className={style.lien} href="/home">
					{TITLE.Home}
				</a>
				<a className={style.lien} href="/test_db">
					{TITLE.Test_BD}
				</a>
				<a className={style.lien} href="/recipes">
					{TITLE.Recipe}
				</a>
				<a className={style.lien} href="/users">
					{TITLE.Users}
				</a>
			</ul>
		</div>
	);
}

export default Navbar;
