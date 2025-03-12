import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RoomDetail = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [habitacion, setHabitacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los detalles de la habitación
  useEffect(() => {
    const fetchHabitacion = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/habitaciones/${id}`);
        setHabitacion(response.data); // Guardar los datos de la habitación
      } catch (error) {
        console.error("❌ Error al obtener la habitación:", error);
        setError("Error al cargar la habitación. Verifica que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };
    fetchHabitacion();
  }, [id]);

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <div>Cargando detalles de la habitación...</div>;
  }

  // Mostrar un mensaje de error si la solicitud falla
  if (error) {
    return <div>{error}</div>;
  }

  // Mostrar un mensaje si la habitación no se encuentra
  if (!habitacion) {
    return <div>No se encontró la habitación.</div>;
  }

  // Mostrar los detalles de la habitación
  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo blanco con opacidad
      borderRadius: "10px", // Bordes redondeados
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Sombra suave
    }}>
      <h1>{habitacion.nombre}</h1>
      <p>{habitacion.descripcion}</p>
      <p>Capacidad: {habitacion.capacidad} personas</p>
      <p>Precio: ${habitacion.tarifa}</p>

      {/* Mostrar las imágenes de la habitación */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "10px", 
        margin: "20px 0" 
      }}>
        {habitacion.imagenes.map((imagen, index) => (
          <div key={index} style={{ 
            width: "100%", 
            aspectRatio: "16/9", // Proporción 16:9
            overflow: "hidden", 
            borderRadius: "8px", 
          }}>
            <img
              src={`/images/${imagen}`}
              alt={`Imagen ${index + 1} de ${habitacion.nombre}`}
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover", // Ajusta la imagen sin distorsionarla
              }}
            />
          </div>
        ))}
      </div>

      {/* Mostrar las reseñas */}
      <h2>Reseñas</h2>
      {habitacion.reviews.length > 0 ? (
        habitacion.reviews.map((review, index) => (
          <div key={index} style={{ 
            marginBottom: "10px", 
            padding: "10px", 
            border: "1px solid #ccc", 
            borderRadius: "8px" 
          }}>
            <p><strong>{review.usuario}</strong></p>
            <p>{review.comentario}</p>
            <p>Calificación: {review.calificacion} / 5</p>
          </div>
        ))
      ) : (
        <p>No hay reseñas aún. ¡Sé el primero en dejar una!</p>
      )}
    </div>
  );
};

export default RoomDetail;