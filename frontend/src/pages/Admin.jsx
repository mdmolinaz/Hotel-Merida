import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarHabitacion } from "../services/api";

const Admin = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [comodidades, setComodidades] = useState("");
  const [imagen, setImagen] = useState("");
  const [tarifa, setTarifa] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const navigate = useNavigate();

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const habitacion = {
        nombre,
        descripcion,
        comodidades: comodidades.split(",").map((item) => item.trim()), // Convertir comodidades en un array
        imagenes: [imagen], // Guardar la imagen en un array
        tarifa: parseFloat(tarifa),
        capacidad: parseInt(capacidad),
      };

      await agregarHabitacion(habitacion); // Enviar la habitación al backend
      alert("Habitación agregada correctamente");
      setNombre("");
      setDescripcion("");
      setComodidades("");
      setImagen("");
      setTarifa("");
      setCapacidad("");
    } catch (error) {
      console.error("Error al agregar habitación:", error);
      alert("Error al agregar habitación");
    }
  };

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: "rgba(255, 255, 255, 0.8)", 
      borderRadius: "10px", 
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", 
    }}>
      <h1>Bienvenido, Administrador</h1>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>Volver al Inicio</button>

      {/* Formulario para agregar habitaciones */}
      <div>
        <h2>Agregar Habitación</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <input
            type="text"
            placeholder="Comodidades (separadas por comas)"
            value={comodidades}
            onChange={(e) => setComodidades(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <input
            type="text"
            placeholder="URL de la imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <input
            type="number"
            placeholder="Tarifa"
            value={tarifa}
            onChange={(e) => setTarifa(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <input
            type="number"
            placeholder="Capacidad"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <button
            type="submit"
            style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Agregar Habitación
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;