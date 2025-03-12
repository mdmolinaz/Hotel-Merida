import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getHabitaciones, agregarReview } from "../services/api";

const Cliente = () => {
  const { user } = useContext(AuthContext); // Obtener el usuario logueado
  const [habitaciones, setHabitaciones] = useState([]); // Lista de habitaciones
  const [selectedHabitacion, setSelectedHabitacion] = useState(""); // Habitación seleccionada
  const [comentario, setComentario] = useState(""); // Comentario de la opinión
  const [calificacion, setCalificacion] = useState(1); // Calificación (1-5)
  const navigate = useNavigate();

  // Obtener las habitaciones al cargar el componente
  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const data = await getHabitaciones();
        setHabitaciones(data);
      } catch (error) {
        console.error("Error al obtener habitaciones:", error);
      }
    };

    fetchHabitaciones();
  }, []);

  // Manejar el envío de la opinión
  const handleSubmitOpinion = async (e) => {
    e.preventDefault();
    try {
      const review = {
        usuario: user.nombre, // Nombre del usuario logueado
        comentario,
        calificacion: parseInt(calificacion),
      };

      await agregarReview(selectedHabitacion, review); // Enviar la opinión al backend
      alert("Opinión enviada correctamente");
      setComentario("");
      setCalificacion(1);
    } catch (error) {
      console.error("Error al enviar la opinión:", error);
      alert("Error al enviar la opinión");
    }
  };

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: "rgba(255, 255, 255, 0.8)", 
      borderRadius: "10px", 
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", 
    }}>
      <h1>Bienvenido, {user?.nombre}</h1>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>Volver al Inicio</button>

      {/* Formulario para dejar opinión */}
      <div style={{ marginBottom: "40px" }}>
        <h2>Dejar una Opinión</h2>
        <form onSubmit={handleSubmitOpinion}>
          <label htmlFor="habitacion">Selecciona una habitación: </label>
          <select
            id="habitacion"
            value={selectedHabitacion}
            onChange={(e) => setSelectedHabitacion(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          >
            <option value="">Selecciona una habitación</option>
            {habitaciones.map((habitacion) => (
              <option key={habitacion._id} value={habitacion._id}>
                {habitacion.nombre}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Escribe tu comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />

          <label htmlFor="calificacion">Calificación (1-5): </label>
          <input
            type="number"
            id="calificacion"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            min="1"
            max="5"
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />

          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Enviar Opinión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cliente;