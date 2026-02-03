// src/middlewares/uploadRecipeImage.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'uploads/recipes');

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, uploadDir);
	},
	filename: (_req, file, cb) => {
		const ext = path.extname(file.originalname);
		const name = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, `${name}${ext}`);
	}
});

export const uploadRecipeImage = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo
	fileFilter: (_req, file, cb) => {
		if (!file.mimetype.startsWith('image/')) {
			return cb(new Error('Fichier non valide'));
		}
		cb(null, true);
	}
});
