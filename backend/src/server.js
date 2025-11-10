import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Exemple de route test
app.get("/api", (req, res) => {
  res.json({ message: "API BatchCooking opérationnelle 🔥" });
});

// Port depuis .env ou 5000 par défaut
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));
