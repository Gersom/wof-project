import { Outlet, Navigate } from "react-router-dom";
import routerNames from "@src/common/constants/routes";
import { useAuth } from "@src/context/auth-provider/authProvider";

export default function ProtectedRoute(){
    const auth = useAuth();
    
    return auth.isAuthenticated? <Outlet/>:<Navigate to={routerNames["login"]}/>
}