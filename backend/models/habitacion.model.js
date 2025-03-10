import mongoose from "mongoose";

const habitacionSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    comodidades: [{ type: String }],
    imagenes: [{ type: String }],
    tarifa: { type: Number, required: true },
    capacidad: { type: Number, required: true }, // Nuevo campo
    reviews: [
      {
        usuario: { type: String },
        comentario: { type: String },
        calificacion: { type: Number },
      },
    ],
  },
  { collection: "habitaciones" }
);

export default mongoose.model("Habitacion", habitacionSchema);