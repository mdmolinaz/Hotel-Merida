import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipo: { type: String, enum: ["cliente", "admin"], default: "cliente" }, // Tipo de usuario
});

export default mongoose.model("User", userSchema);