import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import habitacionesRoutes from "./routes/habitaciones.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Middleware para procesar JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("🏨 API del Hotel Mérida funcionando correctamente.");
});

// Usar las rutas de habitaciones
app.use("/habitaciones", habitacionesRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
