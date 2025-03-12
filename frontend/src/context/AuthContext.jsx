import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verificar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tipo = localStorage.getItem("tipo");

    if (token && tipo) {
      setUser({ token, tipo });
    }
  }, []);

  const login = (token, tipo) => {
    localStorage.setItem("token", token);
    localStorage.setItem("tipo", tipo);
    setUser({ token, tipo });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tipo");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};