import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [formHabitacion, setFormHabitacion] = useState({ nombre: "", descripcion: "", tarifa: "", capacidad: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormHabitacion({ ...formHabitacion, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Habitación agregada correctamente.");
    console.log("Habitación:", formHabitacion);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido, Administrador</h1>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>Volver al Inicio</button>

      {/* Formulario para agregar habitaciones */}
      <div>
        <h2>Agregar Habitación</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
          <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
          <input type="number" name="tarifa" placeholder="Tarifa" onChange={handleChange} required />
          <input type="number" name="capacidad" placeholder="Capacidad" onChange={handleChange} required />
          <button type="submit">Agregar Habitación</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;