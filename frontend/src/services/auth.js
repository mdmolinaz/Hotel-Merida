export const login = async (email, password) => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }
  
    const data = await response.json();
    return data;
  };
  
  export const register = async (nombre, email, password, tipo) => {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password, tipo }),
    });
  
    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }
  
    const data = await response.json();
    return data;
  };