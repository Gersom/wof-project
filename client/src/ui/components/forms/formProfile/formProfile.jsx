import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import FormProfileLocation from "../formProfileLocation/FormProfileLocation";
import { useSelector } from "react-redux";
import { API_URL_PROVINCES, API_URL_COUNTRYS } from "@src/common/constants/api";

import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faUser,
  faEnvelope,
  faLock,
  faEarthAmericas,
  faCity,
  faPhone,
  faIdCard,
  faCalendar,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateIcon from "@icons/nav/user.svg";

const formProfile = () => {
  const userData = useSelector((state) => state.userReducer.user);
  const [provinces, setProvinces] = useState([]);
  const [countries, setCountries] = useState([]);
  const [dataForm, setDataForm] = useState({
    pais: "",
    provincia: "",
    direccion: "",
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

  const handleProvinciaChange = (event) => {
    const provincia = event.target.value;

    setDataForm({ ...dataForm, provincia: provincia });
  };

  return (
    <div className={`${styles["container"]}`}>
      <div className={styles["profile_wrapper"]}>
        <h1>Mi Perfil</h1>
        <div className={styles["profile_cards_container"]}>
          <div className={styles["profile_cards_wrapper"]}>
            <div className={styles["profile_card"]}>
              <h2>Datos de usuario</h2>
              <div className={styles["profile_input"]}>
                <div className={styles["profile_label"]}>
                  <div className={styles["profile_input_icon"]}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <span>Email :</span>
                </div>
                <input
                  type="text"
                  name="email"
                  value={userData?.email}
                  onChange=""
                />
              </div>
              <div className={styles["profile_input"]}>
                <div className={styles["profile_label"]}>
                  <div className={styles["profile_input_icon"]}>
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                  <span>Contraseña :</span>
                </div>
                <input
                  type="text"
                  name="email"
                  value={userData?.password}
                  onChange=""
                />
              </div>
            </div>
            <div className={styles["profile_card"]}>
              <h2>Localicacion</h2>
              <div className={styles["profile_input"]}>
                <div className={styles["profile_label"]}>
                  <div className={styles["profile_input_icon"]}>
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                  <span>Direccion :</span>
                </div>
                <input />
              </div>
              <div className={styles["profile_input"]}>
                <div className={styles["profile_label"]}>
                  <div className={styles["profile_input_icon"]}>
                    {" "}
                    <FontAwesomeIcon icon={faEarthAmericas} />
                  </div>
                  <span>Pais :</span>
                </div>
                <select
                  name="countries"
                  value={dataForm.countries}
                  onChange={handleProvinciaChange}
                >
                  <option value="" disabled>
                    --Seleccionar
                  </option>
                  {countries?.map((countries) => (
                    <option key={countries.id} value={countries.name}>
                      <span>{countries.icon_url}</span> {countries.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles["profile_input"]}>
                <div className={styles["profile_label"]}>
                  <div className={styles["profile_input_icon"]}>
                    {" "}
                    <FontAwesomeIcon icon={faCity} />
                  </div>
                  <span>Provincia :</span>
                </div>
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
          </div>
          <div className={styles["profile_card"]}>
            <h2>Datos personales</h2>
            <div className={styles["profile_input"]}>
              <div className={styles["profile_label"]}>
                <div className={styles["profile_input_icon"]}>
                  {" "}
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <span>Nombres :</span>
              </div>
              <input value={userData?.name} />
            </div>
            <div className={styles["profile_input"]}>
              <div className={styles["profile_label"]}>
                <div className={styles["profile_input_icon"]}>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <span>Apellidos :</span>
              </div>
              <input value={userData?.lastName} />
            </div>
            <div className={styles["profile_input"]}>
              <div className={styles["profile_label"]}>
                <div className={styles["profile_input_icon"]}>
                  {" "}
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <span>Nro de Celular :</span>
              </div>
              <input value={userData?.cell_phone} />
            </div>
            <div className={styles["profile_input"]}>
              <div className={styles["profile_label"]}>
                <div className={styles["profile_input_icon"]}>
                  {" "}
                  <FontAwesomeIcon icon={faIdCard} />
                </div>
                <span>DNI :</span>
              </div>
              <input value={userData?.dni} />
            </div>
            <div className={styles["profile_input"]}>
              <div className={styles["profile_label"]}>
                <div className={styles["profile_input_icon"]}>
                  <FontAwesomeIcon icon={faCalendar} />
                </div>
                <span>Fecha de Nacimiento :</span>
              </div>
              <input value={userData?.birthdate} />
            </div>
            <div className={styles["profile_input"]}>
              <div className={styles["profile_label"]}>
                <div className={styles["profile_input_icon"]}>
                  <FontAwesomeIcon icon={faImage} />
                </div>
                <span>Foto de perfil :</span>
              </div>
              <input
                type="file"
                id="image_input"
                className={styles["input_file_hidden"]}
              />
              <label
                for="image_input"
                className={styles["profile_input_image"]}
              >
                <div
                  value={userData?.profilePicture}
                  className={styles["profile_input_image_preview"]}
                >
                  <img
                    className={styles.imgProfile}
                    src={userData?.profilePicture}
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
          <div className={styles["profile_btn"]}>Guardar cambios</div>
        </div>
      </div>
    </div>
  );
};

export default formProfile;
