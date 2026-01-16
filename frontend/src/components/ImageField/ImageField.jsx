import { useState } from 'react';
import ImageIcon from '../../assets/icons/recipes/add/capture.svg?react';
import style from './ImageField.module.css';

function ImageField()
{
	const [image, setImage] = useState();

	
	return (
		<div>
			<input 
				type="file"
				name="imageRecette"
				id="imageRecette"
				accept="image/*"
				style={{ display: "none" }}
			/>

			<label className={style.label} htmlFor="imageRecette" >
				<ImageIcon />
			</label>
		</div>
	);
}

export default ImageField;
