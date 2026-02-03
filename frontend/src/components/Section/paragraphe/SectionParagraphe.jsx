import style from '../section.module.css';

function SectionParagraphe({ titre, content, taille, icon = null }) {
	return (
		<div className={`${style.container} ${taille}`}>
			<h1 className={style.titre}>
				{icon}
				<span>{titre}</span>
			</h1>
			<p className={style.paragraphe}>{content}</p>
		</div>
	);
}

export default SectionParagraphe;
