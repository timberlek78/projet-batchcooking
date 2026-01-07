import style from '../section.module.css';

function SectionMultiList({ titre, lists, icon }) {
	return (
		<div className={`${style.container}`}>
			<h1 className={style.titre}>
				{icon}
				<span>{titre}</span>
			</h1>
			<div className={style.multiList}>
				{Object.entries(lists).map(([sectionKey, sectionValue]) => (
					<div key={sectionKey}>
						<h2>{sectionValue.Titre}</h2>

						<ul>
							{Object.entries(sectionValue)
								.filter(([key]) => key !== 'Titre')
								.sort(([a], [b]) => Number(a) - Number(b))
								.map(([key, content]) => (
									<li key={key}>{content}</li>
								))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}

export default SectionMultiList;
