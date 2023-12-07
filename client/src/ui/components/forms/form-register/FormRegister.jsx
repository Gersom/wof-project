import { API_URL_PROVINCES } from "@src/common/constants/api";
import { Link } from "react-router-dom";
import { setAlert } from "@src/common/store/slices/alertSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import axios from "axios";
import logo from "@icons/nav/logo.svg";
import routerNames from "@src/common/constants/routes";
import styles from "./styles.module.scss";
import DefaultButton from "@components/buttons/DefaultButton"
import SignUpIcon from "@icons/login/sign-up.svg?react"
import EmailInput from "@components/inputs/EmailInput"
import PasswordInput from "@components/inputs/PasswordInput"
import NameInput from "@components/inputs/NameInput"
import LastNameInput from "@components/inputs/LastNameInput"
import RoleSelect from "@components/inputs/RoleSelect"
import ProvincesSelect from "@components/inputs/ProvincesSelect"

const FormRegister = ({ 
  onSubmitValidated= ()=>null,
  dark=true
}) => {

  const dispatch = useDispatch();
  const [provinces, setProvinces] = useState([]);

  // form´s fild states
  const [dataForm, setDataForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    provinceId: "",
    role: "",
  });

  const handleEmail = (e)=>setDataForm({...dataForm,email:e})
  const handleName = (e)=>setDataForm({...dataForm,name:e})
  const handlePassword = (e)=>setDataForm({...dataForm,password:e})
  const handleLastName = (e)=>setDataForm({...dataForm,lastName:e})
  const handleProvince = (e)=>setDataForm({...dataForm,provinceId:e})
  const handleRole = (e)=>setDataForm({...dataForm,role:e})

  const handleSubmit = async () => {
    const vacio = Object.values(dataForm).every(val => val);
    if (!vacio) {
      dispatch(setAlert({ message: "Te falta completar tus datos", type: "error" }))
    } else {
      onSubmitValidated(dataForm)
    }
  };

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const response = await axios.get(API_URL_PROVINCES);
        setProvinces(response.data)
      } catch (error) {
        dispatch(setAlert({ message: "Oops, no pudimos traer las provincias", type: "error" }))
      }
    }
    getProvinces()
  }, [dispatch]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles["form-container"]}>
          <div className={styles["logo_container"]}>
            <img src={logo} alt="Logo" />
            <span>.com</span>
          </div>
          <h1 className={styles.titulo}>Registrate</h1>
          <div className={styles["form_auth_hr"]}></div>

          <div className={styles["auth_form"]}>
            <form>
              <div className={styles["auth_flex"]}>
                <div className={styles["input_container"]}>
                  <EmailInput onValidated={handleEmail}
                  background="gray" dark={dark} />
                </div>
                <div className={styles["input_container"]}>
                  <NameInput onValidated={handleName}
                  background="gray" dark={dark} />
                </div>
                <div className={styles["input_container"]}>
                  <PasswordInput onValidated={handlePassword}
                  background="gray" dark={dark} />
                </div>
                <div className={styles["input_container"]}>
                  <LastNameInput onValidated={handleLastName}
                  background="gray" dark={dark} />
                </div>
                <div className={styles["input_container"]}>
                  <RoleSelect onSelected={handleRole}
                  background="gray" dark={dark} />
                </div>
                <div className={styles["input_container"]}>
                  <ProvincesSelect onSelected={handleProvince} data={provinces} 
                  background="gray" dark={dark} />
                </div>
              </div>

              <div className={styles["auth_btns"]}>
                <DefaultButton 
                  background={true}
                  size="normal"
                  label="Registrarse"
                  onAction={handleSubmit}>
                  <SignUpIcon />
                </DefaultButton>
                <div style={{marginBottom: "15px"}}></div>
                <div className={styles["register-container"]}>
                  <label>
                    ¿Ya tienes cuenta?&nbsp;
                  </label>
                  <Link to={routerNames["login"]}>
                    inicia sesión
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className={styles["form_auth_hr"]}></div>
        </div>
        <p className={styles["footer_credit"]}>
          <span>•</span>By Group 3<span>•</span>
        </p>
      </div>
    </>
  );
};

export default FormRegister;