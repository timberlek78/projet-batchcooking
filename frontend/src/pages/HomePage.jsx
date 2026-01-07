import HOME from '../constants/pages/Home';
import style from '../pages/styles/home.module.css';

function HomePage() {
	return (
		<div className={style.grille}>
			<div className={style.row}>
				{/*Présentation */}
				<div className={style.container}>
					<h1>{HOME.Titre.Batchcooking}</h1>
					<p>{HOME.Contenu.Batchcooking}</p>
				</div>

				{/* Objectif */}
				<div className={style.container}>
					<h1>{HOME.Titre.Objectif}</h1>
					<ul>
						{Object.values(HOME.Contenu.Objectif).map((obj, index) => (
							<li key={index}>{obj}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
