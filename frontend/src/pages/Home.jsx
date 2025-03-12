import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { getHabitaciones } from "../services/api";

const Home = () => {
  const [habitaciones, setHabitaciones] = useState([]); // Todas las habitaciones
  const [filteredHabitaciones, setFilteredHabitaciones] = useState([]); // Habitaciones filtradas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [capacidad, setCapacidad] = useState(""); // Estado para la capacidad
  const navigate = useNavigate(); // Hook para redireccionar

  // Obtener las habitaciones al cargar el componente
  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const data = await getHabitaciones();
        setHabitaciones(data);
        setFilteredHabitaciones(data); // Inicialmente, mostrar todas las habitaciones
      } catch (error) {
        console.error("❌ Error:", error);
        setError("Error al cargar las habitaciones. Verifica que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    fetchHabitaciones();
  }, []);

  // Filtrar habitaciones por capacidad
  useEffect(() => {
    if (capacidad === "") {
      // Si no hay filtro, mostrar todas las habitaciones
      setFilteredHabitaciones(habitaciones);
    } else {
      // Filtrar habitaciones por capacidad
      const filtered = habitaciones.filter(
        (habitacion) => habitacion.capacidad >= parseInt(capacidad)
      );
      setFilteredHabitaciones(filtered);
    }
  }, [capacidad, habitaciones]);

  if (loading) {
    return <div>Cargando habitaciones...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ 
      height: "100vh", 
      overflowY: "auto", 
      padding: "20px", 
      backgroundColor: "rgba(255, 255, 255, 0.8)", 
      borderRadius: "10px", 
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", 
    }}>
      {/* Botones de Iniciar Sesión y Registrarse */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button 
          onClick={() => navigate("/login")} // Redirige a /login
          style={{ 
            marginRight: "10px", 
            padding: "10px 20px", 
            fontSize: "16px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer", 
          }}
        >
          Iniciar Sesión
        </button>
        <button 
          onClick={() => navigate("/register")} // Redirige a /register
          style={{ 
            padding: "10px 20px", 
            fontSize: "16px", 
            backgroundColor: "#28a745", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer", 
          }}
        >
          Registrarse
        </button>
      </div>

      <h1>Habitaciones Disponibles</h1>

      {/* Campo de búsqueda por capacidad */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="capacidad">Filtrar por capacidad (mínimo): </label>
        <input
          type="number"
          id="capacidad"
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
          placeholder="Ej: 2"
          min="1"
          style={{ padding: "5px", fontSize: "16px" }}
        />
      </div>

      {/* Lista de habitaciones */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "20px" 
      }}>
        {filteredHabitaciones.length > 0 ? (
          filteredHabitaciones.map((habitacion) => (
            <div 
              key={habitacion._id} 
              style={{ 
                border: "1px solid #ccc", 
                padding: "10px", 
                borderRadius: "8px", 
                backgroundColor: "rgba(255, 255, 255, 0.4)", 
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                transition: "transform 0.3s ease, box-shadow 0.3s ease", 
                cursor: "pointer",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {/* Contenedor de la imagen */}
              <div style={{ 
                width: "100%", 
                aspectRatio: "16/9", 
                overflow: "hidden", 
                borderRadius: "8px", 
              }}>
                <img
                  src={habitacion.imagenes[0]} 
                  alt={habitacion.nombre}
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover", 
                  }}
                />
              </div>
              {/* Contenido de la tarjeta */}
              <div style={{ padding: "10px" }}>
                <h2>{habitacion.nombre}</h2>
                <p>{habitacion.descripcion}</p>
                <p>Capacidad: {habitacion.capacidad} personas</p>
                <p>Precio: ${habitacion.tarifa}</p>
              </div>
            </div>
          ))
        ) : (
          <div style={{ 
            padding: "20px", 
            backgroundColor: "rgba(255, 255, 255, 0.4)", 
            borderRadius: "8px", 
            textAlign: "center",
          }}>
            <p>No hay habitaciones disponibles para la capacidad seleccionada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;