import style from '../section.module.css';

function SectionList({ titre, list, taille, icon = null }) {
	return (
		<div className={`${style.container} ${taille}`}>
			<h1 className={style.titre}>
				{icon}
				<span>{titre}</span>
			</h1>
			<ul className={style.list}>
				{Object.values(list).map((obj, index) => (
					<li key={index}>{obj}</li>
				))}
			</ul>
		</div>
	);
}

export default SectionList;
