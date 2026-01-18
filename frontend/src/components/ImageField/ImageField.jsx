import { useState } from 'react';
import ImageIcon from '../../assets/icons/recipes/add/capture.svg?react';
import RecetteImage from '../../assets/images/images.jpg';
import style from './ImageField.module.css';

function ImageField() {
	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const showImage = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// 1) stocker le fichier (pour l'envoyer au backend plus tard)
		setImageFile(file);

		// 2) créer une URL locale pour afficher l'image
		const previewUrl = URL.createObjectURL(file);
		setImagePreview(previewUrl);
	};

	return (
		<div className={style.cadre}>
			<input className={style.input}
				type="file"
				name="imageRecette"
				id="imageRecette"
				accept="image/*"
				onChange={showImage}
			/>
			<label htmlFor='imageRecette' >
				{imagePreview ? <img src={imagePreview} alt="Aperçu" /> : <ImageIcon />}
			</label>
		</div>
	);
}

export default ImageField;
