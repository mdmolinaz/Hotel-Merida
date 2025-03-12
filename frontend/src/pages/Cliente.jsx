import React, { useState, useEffect, useContext } from "react"; // Importa useContext
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Importa el AuthContext
import { getHabitaciones, agregarReview } from "../services/api";
import emailjs from "@emailjs/browser"; // Importa EmailJS

const Cliente = () => {
  const { user } = useContext(AuthContext); // Obtener el usuario logueado
  const [habitaciones, setHabitaciones] = useState([]); // Lista de habitaciones
  const [selectedHabitacionReserva, setSelectedHabitacionReserva] = useState(""); // Habitación seleccionada para reservar
  const [nombreReserva, setNombreReserva] = useState("");
  const [emailReserva, setEmailReserva] = useState("");
  const [fechaReserva, setFechaReserva] = useState("");
  const [selectedHabitacionOpinion, setSelectedHabitacionOpinion] = useState(""); // Habitación seleccionada para opinar
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

  // Manejar el envío de la reserva
  const handleSubmitReserva = async (e) => {
    e.preventDefault();
    try {
      // Datos para el correo
      const templateParams = {
        nombre: nombreReserva,
        email: emailReserva,
        fecha: fechaReserva,
        habitacion: habitaciones.find((h) => h._id === selectedHabitacionReserva)?.nombre || "Desconocida",
      };

      // Enviar el correo con EmailJS
      await emailjs.send(
        "service_zum1zfm", // Service ID
        "template_19rtxgs", // Template ID
        templateParams,
        "ITrY7OmwhkP2HT7V-" // Public Key
      );

      alert("Reserva confirmada. Revisa tu correo.");
      setNombreReserva("");
      setEmailReserva("");
      setFechaReserva("");
      setSelectedHabitacionReserva("");
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Hubo un error al enviar el correo. Inténtalo de nuevo.");
    }
  };

  // Manejar el envío de la opinión
  const handleSubmitOpinion = async (e) => {
    e.preventDefault();
    try {
      const review = {
        usuario: user.nombre, // Nombre del usuario logueado
        comentario,
        calificacion: parseInt(calificacion),
      };

      await agregarReview(selectedHabitacionOpinion, review); // Enviar la opinión al backend
      alert("Opinión enviada correctamente");
      setComentario("");
      setCalificacion(1);
      setSelectedHabitacionOpinion("");
    } catch (error) {
      console.error("Error al enviar la opinión:", error);
      alert("Error al enviar la opinión");
    }
  };

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: "rgba(255, 255, 255, 0.8)", 
      color: "#333", 
      borderRadius: "10px", 
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", 
    }}>
      <h1>Bienvenido, {user?.nombre}</h1>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>Volver al Inicio</button>

      {/* Formulario para reservar */}
      <div style={{ marginBottom: "40px" }}>
        <h2>Reservar Habitación</h2>
        <form onSubmit={handleSubmitReserva}>
          <label htmlFor="habitacionReserva">Selecciona una habitación: </label>
          <select
            id="habitacionReserva"
            value={selectedHabitacionReserva}
            onChange={(e) => setSelectedHabitacionReserva(e.target.value)}
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

          <input
            type="text"
            placeholder="Nombre Completo"
            value={nombreReserva}
            onChange={(e) => setNombreReserva(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={emailReserva}
            onChange={(e) => setEmailReserva(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <input
            type="date"
            value={fechaReserva}
            onChange={(e) => setFechaReserva(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <button
            type="submit"
            style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Confirmar Reserva
          </button>
        </form>
      </div>

      {/* Formulario para dejar opinión */}
      <div>
        <h2>Dejar una Opinión</h2>
        <form onSubmit={handleSubmitOpinion}>
          <label htmlFor="habitacionOpinion">Selecciona una habitación: </label>
          <select
            id="habitacionOpinion"
            value={selectedHabitacionOpinion}
            onChange={(e) => setSelectedHabitacionOpinion(e.target.value)}
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

          <button
            type="submit"
            style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Enviar Opinión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cliente;