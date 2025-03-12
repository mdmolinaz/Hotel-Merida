import axios from "axios";

const API_URL = "http://localhost:5000"; // URL del backend

export const getHabitaciones = async () => {
  try {
    const response = await axios.get(`${API_URL}/habitaciones`);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener las habitaciones:", error);
    throw error;
  }
};

export const agregarHabitacion = async (habitacion) => {
  const response = await fetch("http://localhost:5000/habitaciones", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(habitacion),
  });

  if (!response.ok) {
    throw new Error("Error al agregar habitación");
  }

  return response.json();
};

export const agregarReview = async (habitacionId, review) => {
  const response = await fetch(`http://localhost:5000/habitaciones/${habitacionId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (!response.ok) {
    throw new Error("Error al agregar review");
  }

  return response.json();
};