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
function ImageField({ imageUrl, imageId, onChange }) {
	
	return (
		<div className={style.cadre}>
			<input
				className={style.input}
				type="file"
				name="imageRecette"
				id="imageRecette"
				accept="image/*"
				onChange={onChange}
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
