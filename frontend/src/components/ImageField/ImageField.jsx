import { useEffect } from 'react';
import ImageIcon from '../../assets/icons/recipes/add/capture.svg?react';
import style from './ImageField.module.css';
import { deleteImageBlob, putImageBlob } from '../../utils/imageStore';

/**
 * ImageField
 * - Stocke l'image (Blob) dans IndexedDB via imageStore
 * - Laisse le parent gérer l'aperçu via imageUrl (objectURL)
 * - Renvoie au parent un imageId persisté (string) via onChangeImageId
 */
function ImageField({ imageUrl, imageId, onChangedImageId }) {
	/**
	 * Gestion du choix de fichier:
	 * - supprime l'ancienne image dans IndexedDB si elle existe
	 * - enregistre la nouvelle image en IndexedDB avec un id unique
	 * - renvoie l'id au parent pour l'enregistrer dans newRecipe.imageId
	 */
	const handleFile = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Supprime l'ancienne image si elle existe
		if (imageId) {
			await deleteImageBlob(imageId);
		}

		// Enregistre la nouvelle image dans IndexedDB
		const id = crypto.randomUUID();
		await putImageBlob(id, file);

		// Notifie le parent (il reconstruira l'aperçu avec getImageBlob + createObjectURL)
		onChangedImageId(id);

		// Permet de re-sélectionner le même fichier (sinon onChange peut ne pas se déclencher)
		e.target.value = '';
	};

	/**
	 * Suppression de l'image:
	 * - supprime le Blob en IndexedDB
	 * - remet l'imageId à vide côté parent
	 */
	const removeImage = async (e) => {
		// Empêche de déclencher le click du label/input
		e.preventDefault();
		e.stopPropagation();

		if (imageId) {
			await deleteImageBlob(imageId);
		}

		onChangeImageId('');
	};

	/**
	 * Accessibilité:
	 * - si tu veux cliquer le label pour ouvrir le file picker, c'est OK
	 * - l'id doit être unique si tu as plusieurs ImageField sur la page
	 *   (ici on garde "imageRecette" comme tu as fait, mais idéalement passer un prop)
	 */
	return (
		<div className={style.cadre}>
			<input
				className={style.input}
				type="file"
				name="imageRecette"
				id="imageRecette"
				accept="image/*"
				onChange={handleFile}
			/>

			<label htmlFor="imageRecette" className={style.label}>
				{imageUrl ? (
					<img src={imageUrl} alt="Aperçu" className={style.preview} />
				) : (
					<ImageIcon />
				)}
			</label>
		</div>
	);
}

export default ImageField;
