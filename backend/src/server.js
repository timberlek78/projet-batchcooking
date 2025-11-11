import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbRoutes from "./routes/dbRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === Routes ===
app.use("/db", dbRoutes);

app.use("/api",apiRoutes);

// === Serveur ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur Express lancé sur http://localhost:${PORT}`));
