import express from "express";
import Habitacion from "../models/habitacion.model.js";

const router = express.Router();

// Obtener todas las habitaciones
router.get("/", async (req, res) => {
  try {
    const habitaciones = await Habitacion.find();
    console.log("🔍 Datos obtenidos de MongoDB:", habitaciones);
    res.json(habitaciones);
  } catch (error) {
    console.error("❌ Error al obtener habitaciones:", error);
    res.status(500).json({ mensaje: "Error al obtener habitaciones" });
  }
});

export default router;