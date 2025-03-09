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