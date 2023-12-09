import { API_URL_REGISTER , API_URL_VERIFY_EMAIL } from "@src/common/constants/api";
import { setAlert } from "@src/common/store/slices/alertSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import FormRegister from "@src/ui/components/forms/form-register/FormRegister";
import routerNames from "@src/common/constants/routes";
import ModalCustom from "@src/ui/components/modals/modal-custom/ModalCustom";
import ModalVerifyEmail from "@src/ui/components/modals/modal-verify-email/ModalVerifyEmail";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({})


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
      console.log(dataForm.email)
        await axios.post(API_URL_VERIFY_EMAIL, {email : dataForm.email});
        dispatch(setAlert({ message: "Correo de verificación enviado", type: "success" }))
        setModal(true)
        setForm(dataForm)

    } catch (error) {
      console.log("Error al enviar el correo de verificación:", error.message);
      dispatch(setAlert({ message: "¡Ese correo ya esta en uso!", type: "error" }))
    }
  };
  
  const handleVerifyEmail = async (code) => { //el componente Modal debe llamar a esta funcion al hacer submit del formulario
    try {
      const response = await axios.put(API_URL_VERIFY_EMAIL, { email: form.email, code: code });
      if(response.data.verify){
        setModal(false)
        handleSubmit(form);
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
      <FormRegister onSubmitValidated={sendVerifyEmail} />
      <ModalCustom state={modal} toggleModal={() => setModal(!modal)} isWarning={false}>
        <ModalVerifyEmail onSubmit={handleVerifyEmail} email={form.email}/>
      </ModalCustom>
    </div>
  );
};

export default Register;
