import express from "express";
import Habitacion from "../models/habitacion.model.js";

const router = express.Router();

// Obtener todas las habitaciones
router.get("/", async (req, res) => {
    try {
        const habitaciones = await Habitacion.find(); // ✅ Buscar en MongoDB
        res.json(habitaciones); // ✅ Enviar JSON con las habitaciones
    } catch (error) {
        console.error("❌ Error al obtener habitaciones:", error);
        res.status(500).json({ mensaje: "Error al obtener habitaciones" });
    }
});

export default router;
