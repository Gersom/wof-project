import { useContext, createContext, useState, useEffect } from "react";
import { getFromLocalStorage } from "@common/utils/localStorage"

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

 
   function checkAuth(){
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

  
  function getToken(){
    
    const sessionLS = getFromLocalStorage("session");
    if(sessionLS?.token){
      setAccessToken(sessionLS?.token);
      return sessionLS?.token;
    }
    setAccessToken(null);
    return null;
  }

  useEffect(() => {checkAuth() }, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
