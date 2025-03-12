import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, tipo } = await login(email, password);
      authLogin(token, tipo);
      navigate(tipo === "cliente" ? "/cliente" : "/admin");
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
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;