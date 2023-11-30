import { useState } from "react";
import axios from "axios";

const cloudinaryLogic = () => {
  const [data, setData] = useState({ image: "" });

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PF HENRY");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/djcif4nfp/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const imageUrl = await response.json();
      setData({ ...data, image: imageUrl.url });
    } else {
      console.error("Error al cargar la imagen a Cloudinary");
    }
  };

  const updateData = async () => {
    try {
      await axios.put("api/users/:id", data);
    } catch (error) {
      console.error("Error al actualizar los datos", error);
    }
  };

  return {
    data,
    handleImageUpload,
    updateData,
  };
};

export default cloudinaryLogic;
