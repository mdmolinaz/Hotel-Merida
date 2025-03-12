import express from "express";
import Habitacion from "../models/habitacion.model.js";

const router = express.Router();

// Obtener todas las habitaciones
router.get("/", async (req, res) => {
  try {
    const habitaciones = await Habitacion.find();
    res.json(habitaciones);
  } catch (error) {
    console.error("❌ Error al obtener habitaciones:", error);
    res.status(500).json({ mensaje: "Error al obtener habitaciones" });
  }
});

// Obtener una habitación por su ID
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Obtener el ID de la URL

  try {
    const habitacion = await Habitacion.findById(id); // Buscar la habitación en la base de datos
    if (!habitacion) {
      return res.status(404).json({ mensaje: "Habitación no encontrada" }); // Si no se encuentra, devolver un error 404
    }
    res.json(habitacion); // Devolver la habitación en formato JSON
  } catch (error) {
    console.error("❌ Error al obtener la habitación:", error);
    res.status(500).json({ mensaje: "Error al obtener la habitación" }); // Manejar errores del servidor
  }
});

// Agregar una reseña a una habitación
router.post("/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const { usuario, comentario, calificacion } = req.body;

  try {
    const habitacion = await Habitacion.findById(id);
    if (!habitacion) {
      return res.status(404).json({ mensaje: "Habitación no encontrada" });
    }

    // Agregar la nueva reseña
    habitacion.reviews.push({ usuario, comentario, calificacion });
    await habitacion.save();

    res.status(201).json(habitacion);
  } catch (error) {
    console.error("❌ Error al agregar la reseña:", error);
    res.status(500).json({ mensaje: "Error al agregar la reseña" });
  }
});
   
// Agregar una nueva habitación
router.post("/", async (req, res) => {
  try {
    const habitacion = new Habitacion(req.body);
    await habitacion.save();
    res.status(201).json({ mensaje: "Habitación agregada correctamente", habitacion });
  } catch (error) {
    console.error("Error al agregar habitación:", error);
    res.status(500).json({ mensaje: "Error al agregar habitación" });
  }
});

export default router;