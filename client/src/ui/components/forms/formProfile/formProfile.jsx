import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import handleImageUpload from "../../cloudinary/imageUpload";
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
import eye from "@icons/eye.svg";
import closeEye from "@icons/closeEye.svg";
import user from "@icons/user.svg";
import { useDispatch } from "react-redux";
import ModalCustom from "@components/modals/modal-custom/ModalCustom";
import ModalRole from "@components/modals/modal-role/ModalRole";
import ModalChangePassword from "../../modals/modal-changePassword/ModalChangePassword";
import cross from "@icons/filterSortLocationBar/cross.svg";
import { setAlert } from "@src/common/store/slices/alertSlice";
import { actionGetUser } from "@common/store/actions/userActions";

const FormProfile = () => {
  const apiUrl = API_URL_UPDATE_USER;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user);
  const [provinces, setProvinces] = useState([]);
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({}); //  errors state
  const [showPassword, setShowPassword] = useState(false);
  const [modalRole, setModalRole] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const handleToggleModal = () => setToggleModal(!toggleModal);
  const [dniPasswordShow, setDniPasswordShow] = useState(false);
  const [phonePasswordShow, setPhonePasswordShow] = useState(false);
  const [contrasenaPasswordShow, setContrasenaPasswordShow] = useState(false);

  const [dataForm, setDataForm] = useState({
    name: userData?.name,
    lastName: userData?.lastName,
    email: userData?.email,
    password: userData?.password,
    provinceId: userData?.provinceId,
    cellPhone: userData?.cellPhone,
    address: userData?.address,
    countryId: userData?.countryId,
    birthdate: userData?.birthdate,
    dni: userData?.dni,
    profilePicture: userData?.profilePicture,
  });

  useEffect(() => {
    setDataForm({
      name: userData?.name,
      lastName: userData?.lastName,
      email: userData?.email,
      password: userData?.password,
      provinceId: userData?.provinceId,
      cellPhone: userData?.cellPhone,
      address: userData?.address,
      countryId: userData?.countryId,
      birthdate: userData?.birthdate,
      dni: userData?.dni,
      profilePicture: userData?.profilePicture,
    });
  }, [userData]);

  useEffect(() => {
    if (
      userData.role === null ||
      userData.role === "" ||
      userData.role === undefined
    ) {
      setModalRole(true);
    }

    if (userData.role === "caregiver" || userData.role === "owner") {
      setModalRole(false);
    }
  }, [userData]);

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
      return dispatch(
        setAlert({ message: "Completa los campos", type: "error" })
      );
    } else {
      try {
        await axios.put(`${apiUrl}/${userData?.id}`, dataForm);
        // console.log("Respuesta del servidor:", response.data);
        dispatch(
          setAlert({
            message: `${dataForm.name} ha sido editado`,
            type: "success",
          })
        );
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
    const provinceId = event.target.value;
    setDataForm({ ...dataForm, provinceId: provinceId });
  };

  const handleCountryChange = (event) => {
    const countryId = event.target.value;
    setDataForm({ ...dataForm, countryId: countryId });
  };

  const handlerChangeImage = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    const imagen = await handleImageUpload(file);
    console.log(imagen);
    setDataForm((prevDataForm) => ({
      ...prevDataForm,
      profilePicture: imagen,
    }));
  };

  const createRoleCompleted = () => {
    dispatch(actionGetUser(userData.id));
    setModalRole(false);
  };

  return (
    <>
      <div className={`${styles["container"]}`}>
        <div className={styles["profile_wrapper"]}>
          <h1>Mi Perfil {String(!userData.role)}</h1>
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
                    disabled
                  />
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
                    type="password"
                    name="password"
                    value={dataForm.password}
                    onChange={handleInputChange}
                    disabled
                  />
                  {/* <div
                    className={styles.togglePassword}
                    style={{
                      backgroundImage:
                        "url('" +
                        (!contrasenaPasswordShow ? eye : closeEye) +
                        "')",
                    }}
                    onClick={() =>
                      setContrasenaPasswordShow(!contrasenaPasswordShow)
                    }
                  ></div> 
                  <div
                    style={{ backgroundImage: "url('" + password + "')" }}
                    onClick={handleTogglePasswordVisibility}
                  ></div>*/}
                  <div className={styles.butonModal}>
                    <button
                      onClick={handleToggleModal}
                      className={styles["profile_btn"]}
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
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
                    name="address"
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
                    name="country"
                    value={dataForm.countryId}
                    onChange={handleCountryChange}
                  >
                    <option disabled>{userData?.countries}</option>
                    {console.log(countries)}
                    {countries.map((countries) => (
                      <option key={countries.id} value={countries.id}>
                        {countries.name}
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
                    value={dataForm.provinceId}
                    onChange={handleProvinciaChange}
                  >
                    <option disabled>{userData?.provinces}</option>
                    {provinces.map((provinces) => (
                      <option key={provinces.id} value={provinces.id}>
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
                  type={phonePasswordShow ? "text" : "password"}
                  name="cellPhone"
                  value={dataForm.cellPhone}
                  onChange={handleInputChange}
                />
                <div
                  className={styles.togglePassword}
                  style={{
                    backgroundImage:
                      "url('" + (!phonePasswordShow ? eye : closeEye) + "')",
                  }}
                  onClick={() => setPhonePasswordShow(!phonePasswordShow)}
                ></div>
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
                  type={dniPasswordShow ? "text" : "password"}
                  name="dni"
                  value={dataForm.dni}
                  onChange={handleInputChange}
                />
                <div
                  className={styles.togglePassword}
                  style={{
                    backgroundImage:
                      "url('" + (!dniPasswordShow ? eye : closeEye) + "')",
                  }}
                  onClick={() => setDniPasswordShow(!dniPasswordShow)}
                ></div>
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
                  name="file"
                  id="image_input"
                  className={styles["input_file_hidden"]}
                  onChange={handlerChangeImage}
                />
                <label
                  htmlFor="image_input"
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

      <ModalCustom state={modalRole} closeButton={false}>
        <ModalRole successCreateRole={createRoleCompleted}></ModalRole>
      </ModalCustom>

      {toggleModal && (
        <div className={styles.containerOverlay}>
          <ModalChangePassword
            className={styles.containerModal}
            errors={errors}
            setErrors={setErrors}
            handleToggleModal={handleToggleModal}
          >
            <img
              src={cross}
              alt="cross"
              className={styles.cross}
              onClick={handleToggleModal}
            />
          </ModalChangePassword>
        </div>
      )}
    </>
  );
};

export default FormProfile;
