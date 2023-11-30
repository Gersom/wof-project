import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import {
  API_URL_PROVINCES,
  API_URL_COUNTRYS,
  API_URL_UPDATE_USER,
} from "@src/common/constants/api";
import { validation } from "./validation";
import phoneIcon from "@icons/phoneIcon.svg";
import pictureIcon from "@icons/pictureIcon.svg";
import email from "@icons/email.svg";
import flag from "@icons/flagIcon.svg";
import world from "@icons/worldIcon.svg";
import password from "@icons/password.svg";
import birthdate from "@icons/birthdateIcon.svg";
import idIcon from "@icons/idIcon.svg";
import user from "@icons/user.svg";

const FormProfile = () => {
  const apiUrl = API_URL_UPDATE_USER;
  const userData = useSelector((state) => state.userReducer.user);
  const [provinces, setProvinces] = useState([]);
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({}); //  errors state
  const [showPassword, setShowPassword] = useState(false);
  const [dataForm, setDataForm] = useState({
    name: userData?.name,
    lastName: userData?.lastName,
    email: userData?.email,
    password: userData?.password,
    provinces: userData?.provinces,
    cellPhone: userData?.cellPhone,
    address: userData?.address,
    countries: userData?.countries,
    birthdate: userData?.birthdate,
    dni: userData?.dni,
    profilePicture: userData?.profilePicture,
  });

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
          setCountries(data);
        } else {
          window.alert("Error al obtener la data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      window.alert("Hay errores");
    } else {
      try {
        await axios.put(`${apiUrl}/${userData?.id}`, dataForm);
        // console.log("Respuesta del servidor:", response.data);
        window.alert("¡Información de usuario actualizada!");
      } catch (error) {
        console.error("Error al realizar la solicitud PUT:", error.message);
      }
    }
  };

  function convertirDate(date) {
    const fecha = new Date(date);

    // Obtener componentes de la fecha
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Nota: los meses comienzan desde 0
    const año = fecha.getFullYear();

    // Asegurarse de que el día tenga dos dígitos
    const diaFormateado = dia < 10 ? `0${dia}` : dia;

    // Asegurarse de que el mes tenga dos dígitos
    const mesFormateado = mes < 10 ? `0${mes}` : mes;

    // Formatear la fecha como año-mes-día
    const fechaFormateada = `${año}-${mesFormateado}-${diaFormateado}`;

    return fechaFormateada;
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDataForm((prevDataForm) => ({ ...prevDataForm, [name]: value }));
    validation({ ...dataForm, [name]: value }, errors, setErrors);
    console.log(userData);
    console.log(dataForm);
  };

  const handleProvinciaChange = (event) => {
    const provincia = event.target.value;

    setDataForm({ ...dataForm, provincia: provincia });
  };

  return (
    <>
      <div className={`${styles["container"]}`}>
        <div className={styles["profile_wrapper"]}>
          <h1>Mi Perfil</h1>
          <div className={styles["profile_cards_container"]}>
            <div className={styles["profile_cards_wrapper"]}>
              <div className={styles["profile_card"]}>
                <h2>Datos de usuario</h2>
                <div className={styles["profile_input"]}>
                  <div className={styles["profile_label"]}>
                    <div
                      className={styles["profile_input_icon"]}
                      style={{ backgroundImage: "url('" + email + "')" }}
                    ></div>
                    <span>Email :</span>
                  </div>
                  <input
                    type="text"
                    name="email"
                    value={dataForm.email}
                    onChange={handleInputChange}
                  />
                  <span>{errors.email}</span>
                </div>
                <div className={styles["profile_input"]}>
                  <div className={styles["profile_label"]}>
                    <div
                      className={styles["profile_input_icon"]}
                      style={{ backgroundImage: "url('" + password + "')" }}
                    ></div>
                    <span>Contraseña :</span>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={dataForm.password}
                    onChange={handleInputChange}
                  />
                  <span>{errors.password} </span>
                  <div
                    style={{ backgroundImage: "url('" + password + "')" }}
                    onClick={handleTogglePasswordVisibility}
                  ></div>
                </div>
              </div>
              <div className={styles["profile_card"]}>
                <h2>Localicacion</h2>
                <div className={styles["profile_input"]}>
                  <div className={styles["profile_label"]}>
                    <div
                      className={styles["profile_input_icon"]}
                      style={{ backgroundImage: "url('" + email + "')" }}
                    ></div>
                    <span>Direccion :</span>
                  </div>
                  <input
                    value={dataForm.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles["profile_input"]}>
                  <div className={styles["profile_label"]}>
                    <div
                      className={styles["profile_input_icon"]}
                      style={{ backgroundImage: "url('" + world + "')" }}
                    ></div>
                    <span>Pais :</span>
                  </div>
                  <select
                    name="countries"
                    value={dataForm.countries}
                    onChange={handleProvinciaChange}
                  >
                    <option value={userData?.countries} disabled>
                      --Seleccionar
                    </option>
                    {countries?.map((countries) => (
                      <option key={countries.id} value={countries?.name}>
                        <div>
                          <img src={countries.iconUrl} alt="" />{" "}
                          {countries?.name}
                        </div>

                        {console.log(countries?.iconUrl)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles["profile_input"]}>
                  <div className={styles["profile_label"]}>
                    <div
                      className={styles["profile_input_icon"]}
                      style={{ backgroundImage: "url('" + flag + "')" }}
                    ></div>
                    <span>Provincia :</span>
                  </div>
                  <select
                    name="provinces"
                    value={dataForm.provinces}
                    onChange={handleProvinciaChange}
                  >
                    <option value={userData?.provinces} disabled>
                      --Seleccionar
                    </option>
                    {provinces?.map((provinces) => (
                      <option
                        key={provinces.id}
                        value={userData?.provinces?.name}
                      >
                        {provinces.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className={styles["profile_card"]}>
              <h2>Datos personales</h2>
              <div className={styles["profile_input"]}>
                <div className={styles["profile_label"]}>
                  <div
                    className={styles["profile_input_icon"]}
                    style={{ backgroundImage: "url('" + user + "')" }}
                  ></div>
                  <span>Nombres :</span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={dataForm.name}
                  onChange={handleInputChange}
                />
                <span>{errors.name}</span>
              </div>
              <div className={styles["profile_input"]}>
                <div className={styles["profile_label"]}>
                  <div
                    className={styles["profile_input_icon"]}
                    style={{ backgroundImage: "url('" + user + "')" }}
                  ></div>
                  <span>Apellidos :</span>
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={dataForm.lastName}
                  onChange={handleInputChange}
                />
                <span>{errors.lastName}</span>
              </div>
              <div className={styles["profile_input"]}>
                <div className={styles["profile_label"]}>
                  <div
                    className={styles["profile_input_icon"]}
                    style={{ backgroundImage: "url('" + phoneIcon + "')" }}
                  ></div>
                  <span>Nro de Celular :</span>
                </div>
                <input
                  type="number"
                  name="cellPhone"
                  value={dataForm.cellPhone}
                  onChange={handleInputChange}
                />
                <span>{errors.cellPhone}</span>
              </div>
              <div className={styles["profile_input"]}>
                <div className={styles["profile_label"]}>
                  <div
                    className={styles["profile_input_icon"]}
                    style={{ backgroundImage: "url('" + idIcon + "')" }}
                  ></div>
                  <span>DNI :</span>
                </div>
                <input
                  type="text"
                  name="dni"
                  value={dataForm.dni}
                  onChange={handleInputChange}
                />
                <span>{errors.dni}</span>
              </div>
              <div className={styles["profile_input"]}>
                <div className={styles["profile_label"]}>
                  <div
                    className={styles["profile_input_icon"]}
                    style={{ backgroundImage: "url('" + birthdate + "')" }}
                  ></div>
                  <span>Fecha de Nacimiento :</span>
                </div>
                <input
                  name="birthdate"
                  type="date"
                  value={convertirDate(dataForm.birthdate)}
                  max={new Date().toISOString().split("T")[0]} // Establece el máximo a la fecha actual
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles["profile_input"]}>
                <div className={styles["profile_label"]}>
                  <div
                    className={styles["profile_input_icon"]}
                    style={{ backgroundImage: "url('" + pictureIcon + "')" }}
                  ></div>
                  <span>Foto de perfil :</span>
                </div>
                <input
                  type="file"
                  id="image_input"
                  className={styles["input_file_hidden"]}
                  onChange={handleInputChange}
                />
                <label
                  for="image_input"
                  className={styles["profile_input_image"]}
                >
                  <div className={styles["profile_input_image_preview"]}>
                    <img
                      className={styles.imgProfile}
                      src={dataForm.profilePicture}
                      alt=""
                    />
                  </div>
                  <div className={styles["profile_input_image_btn"]}>
                    Cargar desde ordenador
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className={styles["profile_footer"]}>
            <button onClick={handleSubmit} className={styles["profile_btn"]}>
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormProfile;
