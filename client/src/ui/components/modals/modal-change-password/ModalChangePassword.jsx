import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "@src/common/constants/api";
import styles from "./styles.module.scss";
import password from "@icons/password.svg";
import eye from "@icons/eye.svg";
import closeEye from "@icons/closeEye.svg";
import { validation } from "../../forms/form-profile/validation";

const ModalChangePassword = ({
  children,
  errors,
  setErrors,
  handlerToggleModal,
}) => {
  const userData = useSelector((state) => state.userReducer.user);
  const [showPassword, setShowPassword] = useState(false);
  const [contrasenaPasswordShow, setContrasenaPasswordShow] = useState(false);
  const [repeatContrasenaPasswordShow, setRepeatContrasenaPasswordShow] =
    useState(false);
  const [dataForm, setDataForm] = useState({
    newPassword: userData?.newPassword,
    newPasswordRepeat: userData?.newPasswordRepeat,
    userId: userData?.id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDataForm((prevDataForm) => ({ ...prevDataForm, [name]: value }));
    validation({ ...dataForm, [name]: value }, errors, setErrors);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.values(errors).some((error) => error !== "");

    if (dataForm.password != dataForm.repeatPassword) {
      // window.alert("Hay errores");
    } else {
      try {
        await axios.put(`${API_URL}/change-password/`, {
          newPassword: dataForm.newPassword,
          newPasswordRepeat: dataForm.newPasswordRepeat,
          userId: dataForm.userId,
        });
        // console.log("Respuesta del servidor:", response.data);
        // window.alert("¡Contraseña actualizada!");
        handlerToggleModal();
      } catch (error) {
        console.error("Error al realizar la solicitud PUT:", error.message);
      }
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <form onClick={handleSubmit}>
          <div className={styles.container}>
            <div className={styles["profile_wrapper"]}>
              <h1>¿Deseas cambiar tu contraseña?</h1>
              <p>Es facil y sencillo, solo pon tu nueva contraseña y listo.</p>
              <div className={styles["profile_card"]}>
                <h2>Password</h2>
                <div className={styles["profile_input"]}>
                  <div className={styles["profile_label"]}>
                    <div
                      className={styles["profile_input_icon"]}
                      style={{ backgroundImage: "url('" + password + "')" }}
                    ></div>
                    <span>Nueva Contraseña:</span>
                  </div>
                  <input
                    type={contrasenaPasswordShow ? "text" : "password"}
                    name="newPassword"
                    value={dataForm.newPassword}
                    onChange={handleInputChange}
                  />
                  <div
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
                  <span>{errors.password}</span>
                </div>
                <div className={styles["profile_input"]}>
                  <div className={styles["profile_label"]}>
                    <div
                      className={styles["profile_input_icon"]}
                      style={{ backgroundImage: "url('" + password + "')" }}
                    ></div>
                    <span>Repite Contraseña:</span>
                  </div>
                  <input
                    type={repeatContrasenaPasswordShow ? "text" : "password"}
                    name="newPasswordRepeat"
                    value={dataForm.newPasswordRepeat}
                    onChange={handleInputChange}
                  />
                  <div
                    className={styles.togglePassword}
                    style={{
                      backgroundImage:
                        "url('" +
                        (!repeatContrasenaPasswordShow ? eye : closeEye) +
                        "')",
                    }}
                    onClick={() =>
                      setRepeatContrasenaPasswordShow(
                        !repeatContrasenaPasswordShow
                      )
                    }
                  ></div>
                  <span>{errors.password} </span>
                  <div
                    style={{ backgroundImage: "url('" + password + "')" }}
                    onClick={handleTogglePasswordVisibility}
                  ></div>
                  <div className={styles.butonModal}>
                    <button type="submit" className={styles["profile_btn"]}>
                      Cambiar Contraseña
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalChangePassword;
