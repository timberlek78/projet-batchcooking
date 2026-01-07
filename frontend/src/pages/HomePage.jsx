import HOME from '../constants/pages/Home';
import style from '../pages/styles/home.module.css';

import SectionList from '../components/Section/List/SectionList';
import SectionParagraphe from '../components/Section/paragraphe/SectionParagraphe';
import SectionMultiList from '../components/Section/List/SectionMultiList';

import BatchIcon from '../assets/icons/home/batchcooking.svg?react';
import ObjectifIcon from '../assets/icons/home/target.svg?react';
import ArchiIcon from '../assets/icons/home/archi.svg?react';
import AutorIcon from '../assets/icons/home/autor.svg?react';

function HomePage() {
	return (
		<div className={style.grille}>
			<div className={style.row}>
				{/*Présentation */}
				<SectionParagraphe
					titre={HOME.Titre.Batchcooking}
					content={HOME.Contenu.Batchcooking}
					taille={style.large}
					icon={<BatchIcon />}
				/>

				{/* Objectif */}
				<SectionList
					titre={HOME.Titre.Objectif}
					list={HOME.Contenu.Objectif}
					taille={style.small}
					icon={<ObjectifIcon />}
				/>
			</div>
			<div className={style.row}>
				{/* Architecture */}
				<SectionList
					titre={HOME.Titre.Architecture}
					list={HOME.Contenu.Architecture}
					taille={style.trio}
					icon={<ArchiIcon />}
				/>

				{/* Techno */}
				<SectionMultiList
					titre={HOME.Titre.Techno}
					lists={HOME.Contenu.Techno}
					taille={style.trio}
					icon={<ArchiIcon />}
				/>

				{/*Auteur */}
				<SectionParagraphe
					titre={HOME.Titre.Auteur}
					content={HOME.Contenu.Auteur}
					taille={style.trio}
					icon={<AutorIcon />}
				/>
			</div>
		</div>
	);
}

export default HomePage;
