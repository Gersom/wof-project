import React, { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setAuthenticated: () => { },
});

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const setAuthenticated = (value) => {
    setIsAuthenticated(value);
  };

 
  async function checkAuth(){
    if(accessToken){
      setAuthenticated(true)
    }else{
      const token = getToken();
      if(token){
        setAuthenticated(true);
        return;
      }
      setIsAuthenticated(false);
      return; 
      
    }
  }

  useEffect(() => {checkAuth() }, []);

  function getToken(){
    const {token} = localStorage.getItem("session");
    if(token){
        setAccessToken(token);
      	return token;
    }
    setAccessToken(null);
    return null;
  }


  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

export const useAuth = () => useContext(AuthContext);
