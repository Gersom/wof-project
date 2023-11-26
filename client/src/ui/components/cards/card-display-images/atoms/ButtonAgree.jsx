import plusAgree from '@icons/plusAgree.svg';
import { useState, useRef } from 'react';

const ButtonAgree = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const fileInputRef = useRef(null);

	const handleUpload = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
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
		</>
	);
};

export default ButtonAgree;
