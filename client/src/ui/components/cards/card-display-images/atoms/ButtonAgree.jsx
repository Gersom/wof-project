import plusAgree from '@icons/plusAgree.svg';
import { useState, useRef } from 'react';
import CropImage from './CropImage';

const ButtonAgree = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [imageSrc, setImageSrc] = useState(null);
	const fileInputRef = useRef(null);

	const handleUpload = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			console.log('Archivo seleccionado:', file);
			const reader = new FileReader();
			reader.onLoad = () => {
				setImageSrc(reader.result)
			}
			reader.readAsDataURL(file);
            setSelectedFile(file);
			//enviar al servidor --->
		}
	};
	return (
		<>
			<button onClick={handleUpload}>
				<img src={plusAgree} alt='plusAgree' />
				Agregar
			</button>
			<input
				type='file'
				onChange={handleFileChange}
				ref={fileInputRef}
				style={{ display: 'none' }}
			/>
			{selectedFile && <CropImage imageSrc={imageSrc} />}
		</>
	);
};

export default ButtonAgree;
