import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { API_URL_PROVINCES, API_URL_COUNTRYS } from "@src/common/constants/api";
import styles from "./styles.module.scss";
import emailIcon from "@icons/email.svg";
import state from "@icons/state.svg";

const FormProfileLocation = () => {
  const userData = useSelector((state) => state.userReducer.user);
  const [provinces, setProvinces] = useState([]);
  const [country, setCountrys] = useState([]);
  const [errors, setErrors] = useState({}); //  errors state

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

  useEffect(() => {
    axios(API_URL_COUNTRYS)
      .then(({ data }) => {
        if (data) {
          setCountrys(data);
        } else {
          window.alert("Error al obtener la data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const [dataForm, setDataForm] = useState({
    pais: "",
    provincia: "",
    direccion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDataForm((prevDataForm) => ({ ...prevDataForm, [name]: value }));
    validation({ ...dataForm, [name]: value }, errors, setErrors);
  };

  const handleProvinciaChange = (event) => {
    const provincia = event.target.value;

    setDataForm({ ...dataForm, provincia: provincia });
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
        window.alert("Usuario creado correctamente");
        goBackHandler();
      } catch (error) {
        console.error("Error al realizar la solicitud POST:", error.message);
        window.alert("Error al crear usuario");
      }
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles["form-container"]}>
          <h1 className={styles.titulo}>Locación</h1>
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
                    <span>Dirección:</span>
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={dataForm.direccion}
                    onChange={handleInputChange}
                  />
                  <span>{errors.direccion}</span>
                </div>
                <div className={styles["input_container"]}>
                  <label>
                    <div
                      className={styles["auth_form_icon"]}
                      style={{ backgroundImage: "url('" + state + "')" }}
                    ></div>
                    <span>Pais:</span>
                  </label>
                  <select
                    name="pais"
                    value={dataForm.pais}
                    onChange={handleProvinciaChange}
                  >
                    <option value="" disabled>
                      --Seleccionar
                    </option>
                    {country?.map((country) => (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>
                    ))}
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProfileLocation;
