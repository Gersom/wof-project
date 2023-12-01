import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import logo from "@icons/nav/logo.svg";
import routerNames from "@src/common/constants/routes";
import { validation } from "./validation";
import { useDispatch } from "react-redux";
import { setAlert } from "@src/common/store/slices/alertSlice";
import {
  API_URL_REGISTER,
  API_URL_PROVINCES,
} from "@src/common/constants/api";

import passwordIcon from "@icons/password.svg";
import emailIcon from "@icons/email.svg";
import userIcon from "@icons/nav/user.svg";
import state from "@icons/state.svg";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const FormRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const apiUrl = API_URL_REGISTER;

  useEffect(() => {
    axios(API_URL_PROVINCES)
      .then(({ data }) => {
        if (data) {
          setProvinces(data);
        } else {
          window.alert("Error al obtener la data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // form´s fild states
  const [dataForm, setDataForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    provincia: "",
    role: "",
  });

  const [errors, setErrors] = useState({}); //  errors state

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDataForm((prevDataForm) => ({ ...prevDataForm, [name]: value }));
    validation({ ...dataForm, [name]: value }, errors, setErrors);
  };

  const handleProvinciaChange = (event) => {
    const provincia = event.target.value;

    setDataForm({ ...dataForm, provincia: provincia });
  };

  const handleRoleChange = (event) => {
    const role = event.target.value;

    setDataForm({ ...dataForm, role: role });
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordValue = e.target.elements.password.value;
    const { name, password, email, lastName, role, provincia } = dataForm;

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      window.alert("Hay errores");
    } else {
      try {
        await axios.post(apiUrl, dataForm);
        // console.log("Respuesta del servidor:", response.data);

        dispatch(setAlert({ message: "Usuario creado correctamente", type: "success" }))
        goBackHandler();
      } catch (error) {
        console.error("Error al realizar la solicitud POST:", error.message);
        dispatch(setAlert({ message: "Error al crear el usuario", type: "error" }))
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["form-container"]}>
          <div className={styles["logo_container"]}>
            <img src={logo} alt="Logo" />
            <span>.com</span>
          </div>
          <h1 className={styles.titulo}>Registro</h1>
          <div className={styles["form_auth_hr"]}></div>
          <div className={styles["auth_form"]}>
            <form onSubmit={handleSubmit}>
              <div className={styles["auth_flex"]}>
                <div className={styles["input_container"]}>
                  <label>
                    <div
                      className={styles["auth_form_icon"]}
                      style={{ backgroundImage: "url('" + emailIcon + "')" }}
                    ></div>
                    <span>Email:</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={dataForm.email}
                    onChange={handleInputChange}
                  />
                  <span>{errors.email}</span>
                </div>
                <div className={styles["input_container"]}>
                  <label>
                    <div
                      className={styles["auth_form_icon"]}
                      style={{ backgroundImage: "url('" + userIcon + "')" }}
                    ></div>
                    <span>Nombre:</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={dataForm.name}
                    onChange={handleInputChange}
                  />
                  <span>{errors.name}</span>
                </div>
                <div className={styles["input_container"]}>
                  <label>
                    <div
                      className={styles["auth_form_icon"]}
                      style={{ backgroundImage: "url('" + passwordIcon + "')" }}
                    ></div>
                    <span>Contraseña:</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={dataForm.password}
                    onChange={handleInputChange}
                  />
                  <div
                    className={styles["toggle-password-icon"]}
                    onClick={handleTogglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </div>
                  <span>{errors.password}</span>
                </div>
                <div className={styles["input_container"]}>
                  <label>
                    <div
                      className={styles["auth_form_icon"]}
                      style={{ backgroundImage: "url('" + userIcon + "')" }}
                    ></div>
                    <span>Apellido:</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={dataForm.lastName}
                    onChange={handleInputChange}
                  />
                  <span>{errors.lastName}</span>
                </div>
                <div className={styles["input_container"]}>
                  <label>
                    <div
                      className={styles["auth_form_icon"]}
                      style={{ backgroundImage: "url('" + state + "')" }}
                    ></div>
                    <span>Role:</span>
                  </label>
                  <select
                    name="role"
                    value={dataForm.role}
                    onChange={handleRoleChange}
                  >
                    {/* <option value="" disabled>
                      --Seleccionar
                    </option> */}
                    <option value="caregivers">Cuidador</option>
                    <option value="owner" disabled>
                      Dueño
                    </option>
                  </select>
                </div>
                <div className={styles["input_container"]}>
                  <label>
                    <div
                      className={styles["auth_form_icon"]}
                      style={{ backgroundImage: "url('" + state + "')" }}
                    ></div>
                    <span>Provincia:</span>
                  </label>
                  <select
                    name="provincia"
                    value={dataForm.provincia}
                    onChange={handleProvinciaChange}
                  >
                    <option value="" disabled>
                      --Seleccionar
                    </option>
                    {provinces?.map((provinces) => (
                      <option key={provinces.id} value={provinces.name}>
                        {provinces.name}
                      </option>
                    ))}
                  </select>
                  <span>{errors.provincia}</span>
                </div>
                {dataForm.role === "Dueño" && (
                  <div className={styles.formGroup}>
                    <label> Adicional Dueño: </label>
                    <input
                      type="text"
                      name="additionalFieldDueño"
                      value={dataForm.additionalFieldDueño}
                      onChange={handleInputChange}
                    />
                    <span></span>
                  </div>
                )}

                {/* /* {dataForm.role === "Cuidador" && (
                  <div className={styles.formGroup}>
                    <label> Adicional Cuidador: </label>
                    <input
                      type="text"
                      name="additionalFieldCuidador"
                      value={dataForm.additionalFieldCuidador}
                      onChange={handleInputChange}
                    />
                    <span></span>
                  </div>
                )} */}
              </div>

              <div className={styles["auth_btns"]}>
                <button className={styles["auth_btn"]} type="submit">
                  Registrarse
                </button>
                <Link to={routerNames["login"]} className={styles["auth_btn"]}>
                  Iniciar Sesión
                </Link>
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

// dispatch(
//   createUser({
//     name,
//     lastname,
//     email,
//     password,
//     role,
//     provincia,
//   })
// );
