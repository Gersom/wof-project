const FormRegister = () => {
  return (
    <div>
      <div>
        <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
          <h1>Home</h1>
        </Link>
      </div>
      <h1>Crea tu Perfil</h1>
      <form>
        <div>
          <div>
            <label>Nombre: </label>
            <input type="text" name="" value="" onChange="" />
            <span>{errors}</span>
          </div>
          <div>
            <label>Apellido: </label>
            <input type="text" name="" value="" onChange="" />
            <span>{errors}</span>
          </div>
          <div>
            <label>Dni: </label>
            <input type="text" name="" value="" onChange="" />
            <span>{}</span>
          </div>
          <label>Email: </label>
          <input type="text" name="name" value="" onChange="" />
          <span>{errors.name}</span>
        </div>
        <div>
          <label>Password: </label>
          <input type="text" name="name" value="" onChange="" />
          <span>{errors.name}</span>
        </div>
        <div>
          <label>Telefono: </label>
          <input type="text" value="" onChange="" />
          <span>{}</span>
        </div>
        <div>
          <label>Direccion: </label>
          <input type="text" name="" value="" onChange="" />
          <span>{errors.name}</span>
        </div>
        <div>
          <label>Provincia: </label>
          <input type="text" name="" value="" onChange="" />
          <span>{errors.name}</span>
        </div>

        <div>
          <label>Fecha de Nacimiento: </label>
          <input type="text" name="" value="" onChange="" />
          <span>{}</span>
        </div>
        <div>
          <label>Role </label>
          <select name="" id="">
            <option value="" disabled>
              --Select
            </option>
            <option value="">Dueño</option>
            <option value="">Cuidador</option>
          </select>
        </div>

        <button onClick="" type="submit">
          Enviar
        </button>
      </form>
      <button
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          width: "100px",
          cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default FormRegister;
