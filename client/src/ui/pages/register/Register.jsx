import { API_URL_REGISTER } from "@src/common/constants/api";
import { setAlert } from "@src/common/store/slices/alertSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormRegister from "@src/ui/components/forms/formRegister/FormRegister";
import routerNames from "@src/common/constants/routes";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (dataForm) => {
    try {
      await axios.post(API_URL_REGISTER, dataForm);
      dispatch(setAlert({ message: "Usuario creado correctamente", type: "success" }))
      // console.log("Respuesta del servidor:", response.data);
      navigate(routerNames["login"]);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error.message);
      dispatch(setAlert({ message: "Error al crear el usuario", type: "error" }))
    }
  };
  

  return (
    <div className="Register" style={{ height: "100%"}}>
      <FormRegister onSubmitValidated={handleSubmit} />
    </div>
  );
};

export default Register;
