import { API_URL_REGISTER , API_URL_VERIFY_EMAIL } from "@src/common/constants/api";
import { setAlert } from "@src/common/store/slices/alertSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormRegister from "@src/ui/components/forms/form-register/FormRegister";
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

  const sendVerifyEmail = async (dataForm) => {  //el componente FormRegister debe llamar a esta funcion al hacer submit del formulario
    try {
        await axios.post(API_URL_VERIFY_EMAIL, dataForm.email);
        dispatch(setAlert({ message: "Correo de verificación enviado", type: "success" }))

        'setModal(true)'

    } catch (error) {
      console.log("Error al enviar el correo de verificación:", error.message);
      dispatch(setAlert({ message: "Error al enviar el correo de verificación", type: "error" }))
    }
  };
  
  const handleVerifyEmail = async (dataForm) => { //el componente Modal debe llamar a esta funcion al hacer submit del formulario
    try {
      const response = await axios.put(API_URL_VERIFY_EMAIL, { email: dataForm.email, code: "codigo" });
      if(response.data.verify){
        'setModal(false)'
        handleSubmit(dataForm);
      } else {
        dispatch(setAlert({ message: "Código incorrecto", type: "error" }))
      }
    } catch (error) {
      dispatch(setAlert({ message: "Error al verificar el correo", type: "error" }))
      console.error("Error al realizar la solicitud POST:", error.message);
    }
  };

  return (
    <div className="Register" style={{ height: "100%"}}>
      <FormRegister onSubmitValidated={handleSubmit} />
    </div>
  );
};

export default Register;
