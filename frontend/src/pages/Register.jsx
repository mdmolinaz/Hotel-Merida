import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("cliente");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(nombre, email, password, tipo);
      alert("Usuario registrado correctamente");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      background: "url('/ruta/a/tu/imagen.jpg') no-repeat center center/cover", 
    }}>
      <div style={{ 
        padding: "20px", 
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        borderRadius: "10px", 
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", 
        width: "100%", 
        maxWidth: "400px", 
      }}>
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          >
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
          <button
            type="submit"
            style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;