import React, { createContext, useState, useEffect } from "react";

// Create a new context for authentication
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if the user is already authorized (e.g., via session storage)
    const authorized = sessionStorage.getItem("isAuthenticated");
    return !!authorized;
  });

  useEffect(() => {
    // Update the session storage whenever the isAuthenticated state changes
    sessionStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const login = () => {
    // Perform your login logic here
    // For simplicity, we will just set the isAuthenticated to true
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Perform your logout logic here
    // For simplicity, we will just set the isAuthenticated to false
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
