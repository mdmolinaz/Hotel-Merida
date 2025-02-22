import { useState } from "react";
import emailjs from "@emailjs/browser"; // Importar EmailJS
import "../index.css";

// 🔹 Datos de EmailJS 
const SERVICE_ID = "service_zum1zfm";  // mi Service ID
const TEMPLATE_ID = "template_19rtxgs";  // mi Template ID
const PUBLIC_KEY = "ITrY7OmwhkP2HT7V-";  // mi Public Key

function Reservas() {
  const [form, setForm] = useState({ nombre: "", email: "", fecha: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parámetros que se enviarán en el correo
    const emailParams = {
      nombre: form.nombre,
      email: form.email,
      fecha: form.fecha,
    };

    // 🔍 Verifica en la consola si los datos son correctos
    console.log("Datos enviados a EmailJS:", emailParams);

    // Enviar el correo con EmailJS
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, emailParams, PUBLIC_KEY)
      .then(
        () => {
          alert(`Reserva confirmada para ${form.nombre} el ${form.fecha}. Revisa tu correo.`);
        },
        (error) => {
          console.error("Error al enviar el correo:", error);
          alert("Hubo un error al enviar el correo. Inténtalo de nuevo.");
        }
      );
  };

  return (
    <div className="container">
      <h2>Reserva tu habitación 🏨</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre Completo" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
        <input type="date" name="fecha" onChange={handleChange} required />
        <button type="submit">Confirmar Reserva</button>
      </form>
    </div>
  );
}

export default Reservas;
