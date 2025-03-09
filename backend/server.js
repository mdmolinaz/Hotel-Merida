import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Importar cors
import dotenv from "dotenv";
import habitacionesRoutes from "./routes/habitaciones.routes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// Ruta para la raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido al servidor del hotel!");
});

// Rutas
app.use("/habitaciones", habitacionesRoutes);

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});