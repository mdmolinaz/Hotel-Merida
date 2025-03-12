import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Cliente = () => {
  const [formReserva, setFormReserva] = useState({ nombre: "", email: "", fecha: "", habitacion: "" });
  const [formOpinion, setFormOpinion] = useState({ usuario: "Cliente Logueado", comentario: "", calificacion: 0 });
  const navigate = useNavigate();

  const handleReservaChange = (e) => setFormReserva({ ...formReserva, [e.target.name]: e.target.value });
  const handleOpinionChange = (e) => setFormOpinion({ ...formOpinion, [e.target.name]: e.target.value });

  const handleReservaSubmit = (e) => {
    e.preventDefault();
    emailjs.send("service_zum1zfm", "template_19rtxgs", formReserva, "ITrY7OmwhkP2HT7V-")
      .then(() => {
        alert(`Reserva confirmada para ${formReserva.nombre} el ${formReserva.fecha}. Revisa tu correo.`);
      })
      .catch((error) => {
        console.error("Error al enviar el correo:", error);
        alert("Hubo un error al enviar el correo. Inténtalo de nuevo.");
      });
  };

  const handleOpinionSubmit = (e) => {
    e.preventDefault();
    alert("Opinión enviada correctamente.");
    console.log("Opinión:", formOpinion);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido, Cliente</h1>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>Volver al Inicio</button>

      {/* Formulario de Reserva */}
      <div style={{ marginBottom: "40px" }}>
        <h2>Reservar Habitación</h2>
        <form onSubmit={handleReservaSubmit}>
          <input type="text" name="nombre" placeholder="Nombre Completo" onChange={handleReservaChange} required />
          <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleReservaChange} required />
          <input type="date" name="fecha" onChange={handleReservaChange} required />
          <select name="habitacion" onChange={handleReservaChange} required>
            <option value="">Selecciona una habitación</option>
            <option value="Habitación 1">Habitación 1</option>
            <option value="Habitación 2">Habitación 2</option>
            <option value="Habitación 3">Habitación 3</option>
          </select>
          <button type="submit">Confirmar Reserva</button>
        </form>
      </div>

      {/* Formulario de Opinión */}
      <div>
        <h2>Dejar una Opinión</h2>
        <form onSubmit={handleOpinionSubmit}>
          <input type="text" name="usuario" value={formOpinion.usuario} readOnly />
          <textarea name="comentario" placeholder="Escribe tu comentario" onChange={handleOpinionChange} required />
          <input type="number" name="calificacion" placeholder="Calificación (1-5)" min="1" max="5" onChange={handleOpinionChange} required />
          <button type="submit">Enviar Opinión</button>
        </form>
      </div>
    </div>
  );
};

export default Cliente;