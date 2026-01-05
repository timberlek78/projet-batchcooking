import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// === Serveur ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur Express lancé sur http://localhost:${PORT}`));
