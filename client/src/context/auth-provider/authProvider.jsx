import React, { useContext, createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthContext = createContext({
  isAuthenticated: false,
  setAuthenticated: () => {}, 
});

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuthenticated = (value) => {
    setIsAuthenticated(value);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

export const useAuth = () => useContext(AuthContext);
