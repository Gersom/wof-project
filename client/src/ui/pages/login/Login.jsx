import { API_URL_USER } from "@src/common/constants/api";
import { setAlert } from "@src/common/store/slices/alertSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import FormLogin from "@src/ui/components/forms/form-login/FormLogin";
import routerNames from "@src/common/constants/routes";
import { useAuth } from "@common/context/authProvider";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@common/utils/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setAuthenticated } = useAuth();

  const handleSubmit = async (dataForm) => {
    try {
      const response = await axios.post(
        API_URL_USER + "/login", dataForm
      );

      saveToLocalStorage("session", {
        userId: response.data.userId,
        token: response.data.token,
      });

      if (response.data.token) {
        dispatch(setAlert({ message: "Inicio de sesion completado", type: "success" }));
        navigate(routerNames["loading"]);
        setAuthenticated(true);
      }
    } catch (error) {
      dispatch(setAlert({ message: "Error al iniciar sesión", type: "error" }));
      
    }
  };
  
  useEffect(() => {
    // if (getFromLocalStorage()) {
      const storage = getFromLocalStorage("session");
      if (storage?.userId && storage?.token) {
        navigate(routerNames["loading"]);
      }
    //}
  }, [navigate]);

  return (
    <div className="Login" style={{ height: "100%"}}>
      <FormLogin onSubmitValidated={handleSubmit} />
    </div>
  );
};

export default Login;
