import React, { useEffect, useState } from "react";
import { getHabitaciones } from "../services/api";

const Home = () => {
  const [habitaciones, setHabitaciones] = useState([]); // Todas las habitaciones
  const [filteredHabitaciones, setFilteredHabitaciones] = useState([]); // Habitaciones filtradas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [capacidad, setCapacidad] = useState(""); // Estado para la capacidad

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
    <div style={{ height: "100vh", overflowY: "auto", padding: "20px" }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {filteredHabitaciones.length > 0 ? (
          filteredHabitaciones.map((habitacion) => (
            <div key={habitacion._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
              <h2>{habitacion.nombre}</h2>
              <p>{habitacion.descripcion}</p>
              <p>Capacidad: {habitacion.capacidad} personas</p>
              <p>Precio: ${habitacion.tarifa}</p>
              <img
                src={habitacion.imagenes[0]} // Usa la ruta relativa
                alt={habitacion.nombre}
                style={{ width: "100%", maxWidth: "300px", height: "auto", borderRadius: "8px" }}
              />
            </div>
          ))
        ) : (
          <p>No hay habitaciones disponibles para la capacidad seleccionada.</p>
        )}
      </div>
    </div>
  );
};

export default Home;