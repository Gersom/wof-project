import React from "react";
import cloudinaryLogic from "./cloudinaryLogic";

const Cloudinary = () => {
  const { data, handleImageUpload, updateData } = cloudinaryLogic();

  const handleSubmit = (event) => {
    event.preventDefault();
    updateData();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    handleImageUpload(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image" className="form-label">
          <strong>Imagen</strong>
        </label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="form-control"
        />
        {data.image && <img src={data.image} alt={data.name} />}
        <button type="submit">Actualizar</button>
      </div>
    </form>
  );
};

export default Cloudinary;
