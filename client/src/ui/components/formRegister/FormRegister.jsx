import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import routerNames from "@src/common/constants/routes";

const FormRegister = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDataForm({ ...dataForm, [name]: value });
    validation({ ...dataForm, [name]: value }, errors, setErrors);
  };
  return (
    <>
      <div>
        <h1 className={styles.titulo}>Crea tu Perfil</h1>
        <form className={styles.form}>
          <div className={styles.campos}>
            <div className={styles.campos}>
              <label>Nombre: </label>
              <input
                type="text"
                name=""
                value=""
                onChange={handleInputChange}
              />
              <span></span>
            </div>
            <div>
              <label>Apellido: </label>
              <input
                type="text"
                name=""
                value=""
                onChange={handleInputChange}
              />
              <span></span>
            </div>
            <div>
              <label>Dni: </label>
              <input
                type="text"
                name=""
                value=""
                onChange={handleInputChange}
              />
              <span></span>
            </div>
            <label>Email: </label>
            <input
              type="text"
              name="name"
              value=""
              onChange={handleInputChange}
            />
            <span></span>
          </div>
          <div className={styles.campos}>
            <label>Password: </label>
            <input
              type="text"
              name="name"
              value=""
              onChange={handleInputChange}
            />
            <span></span>
          </div>
          <div className={styles.campos}>
            <label>Telefono: </label>
            <input type="text" value="" onChange={handleInputChange} />
            <span></span>
          </div>
          <div className={styles.campos}>
            <label>Direccion: </label>
            <input type="text" name="" value="" onChange={handleInputChange} />
            <span></span>
          </div>
          <div className={styles.campos}>
            <label>Provincia: </label>
            <input type="text" name="" value="" onChange={handleInputChange} />
            <span></span>
          </div>

          <div className={styles.campos}>
            <label>Fecha de Nacimiento: </label>
            <input type="date" />
            <span></span>
          </div>
          <div className={styles.campos}>
            <label>Role </label>
            <select name="" id="">
              <option value="" disabled>
                --Select
              </option>
              <option value="">Dueño</option>
              <option value="">Cuidador</option>
            </select>
          </div>
          <div className={styles.campos}>
            <button
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                width: "100px",
                cursor: "pointer",
                marginRight: "1rem",
                border: "solid 1px",
              }}
              type="submit"
            >
              Enviar
            </button>
            <Link to={routerNames["formRegister"]}>
              <button
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  width: "100px",
                  cursor: "pointer",
                  border: "solid 1px",
                }}
                onClick={goBackHandler}
              >
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormRegister;
