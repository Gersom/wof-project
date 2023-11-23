import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import logo from "@icons/nav/logo.svg";
import routerNames from "@src/common/constants/routes";
import { validation } from "./validation";
import { useDispatch } from "react-redux";

import passwordIcon from "@icons/password.svg";
import emailIcon from "@icons/email.svg";
import userIcon from "@icons/nav/user.svg";
import state from "@icons/state.svg";

const FormRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch;

  // form´s fild states
  const [dataForm, setDataForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    provincia: "",
    role: "",
  });

  const [errors, setErrors] = useState({}); //  errors state

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDataForm({ ...dataForm, [name]: value });
    validation({ ...dataForm, [name]: value }, errors, setErrors);
  };

  const handleRoleChange = (event) => {
    const role = event.target.value;

    setDataForm({ ...dataForm, role: role });
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, password, email, lastname } = dataForm;

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (!name || !lastname || !email || !password) {
      window.alert("Faltan Datos Obligatorios");
    } else if (hasErrors) {
      window.alert("hay errores");
    } else {
      dispatch(
        createUser({
          name,
          lastname,
          email,
          password,
          role,
          provincia,
        })
      );
      window.alert("Usuario creado correctamente");
      navigate(-1);
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
                    type="password"
                    name="password"
                    value={dataForm.password}
                    onChange={handleInputChange}
                  />
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
                    name="lastname"
                    value={dataForm.lastname}
                    onChange={handleInputChange}
                  />
                  <span>{errors.lastname}</span>
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
                    <option value="" disabled>
                      --Select
                    </option>
                    <option value="1">Cuidador</option>
                    <option value="1">Dueño</option>
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
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      --Select
                    </option>
                    <option value="1">1</option>
                    <option value="1">2</option>
                    <option value="1">3</option>
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
                {dataForm.role === "Cuidador" && (
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
                )}
              </div>

              <div className={styles["auth_btns"]}>
                <button className={styles["auth_btn"]} type="submit">
                  Registrarse
                </button>
                <Link to={routerNames["inicio"]} className={styles["auth_btn"]}>
                  Iniciar Sesión
                </Link>
              </div>
            </form>
          </div>
          <div className={styles["form_auth_hr"]}></div>
        </div>
        <p className={styles["footer_credit"]}>
          <span>•</span>By Gerson<span>•</span>
        </p>
      </div>
    </>
  );
};

export default FormRegister;
