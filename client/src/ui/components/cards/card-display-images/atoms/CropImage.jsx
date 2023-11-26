import React, {useState} from 'react'

const CropImage = ({imageSrc}) => {

    const [crop, setCrop] = useState({ aspect: 1 / 1 }); // Proporción de recorte cuadrado por defecto
    const [croppedImage, setCroppedImage] = useState(null);
  return (
    <div>CropImage</div>
  )
}

export default CropImage