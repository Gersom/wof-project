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
    return imageUrl.url;
  } else {
    console.error("Error al cargar la imagen a Cloudinary");
  }
};

export default handleImageUpload;
