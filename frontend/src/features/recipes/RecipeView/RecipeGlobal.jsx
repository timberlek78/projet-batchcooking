import service from '../../../services/recipe.service.js';

function RecipeGlobal({ recipe }) {
	const imageUrl = service.getImage(recipe.recipe_image);

	return (
		<div
			className={style.info}
			style={{    
				backgroundImage: imageUrl ? `url(${imageUrl})` : 'none'
			}}
		>
			{/* Contenu par-dessus l’image */}
		</div>
	);
}

export default RecipeGlobal;
