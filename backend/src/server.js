import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

//Importation des routes
import ingredientRoutes from './routes/ingredient.routes.js';
import recipeRoutes from './routes/recipes.routes.js';
import stepesRoutes from './routes/stepes.routes.js';
import usersRoutes from './routes/users.routes.js';
import weekRoutes from './routes/week.routes.js';
import dbRoutes from './routes/db.routes.js';

dotenv.config();

const app = express();
app.use(
	cors({
		origin: process.env.SITE_URL,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	})
);
app.use(helmet());
app.use(express.json());

app.use('/db', dbRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/recipes', recipeRoutes);
app.use('/stepes', stepesRoutes);
app.use('/users', usersRoutes);
app.use('/week', weekRoutes);
app.use(
	'/uploads',
	(req, res, next) => {
		res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
		next();
	},
	express.static(path.join(process.cwd(), 'uploads'))
);


app.use(notFound);
app.use(errorHandler);

// === Serveur ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur Express lancé sur http://localhost:${PORT}`));

export default app;
