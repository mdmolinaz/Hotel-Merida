import { Link } from "react-router-dom";
import "../index.css";

function Home() {
  return (
    <div className="container">
      <h1>Bienvenido al Hotel en Mérida 🏔️</h1>
      <p>Disfruta de la mejor experiencia en nuestro hotel rodeado de montañas y naturaleza.</p>
      <Link to="/reservas" className="btn">Reservar Ahora</Link>
    </div>
  );
}

export default Home;
