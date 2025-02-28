import mongoose from "mongoose";

const habitacionSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    comodidades: [String], 
    imagenes: [String], 
    tarifa: { type: Number, required: true },
    reviews: [{
        usuario: String,
        comentario: String,
        calificacion: Number
    }]
}, { timestamps: true });

const Habitacion = mongoose.model("Habitacion", habitacionSchema);

export default Habitacion;
