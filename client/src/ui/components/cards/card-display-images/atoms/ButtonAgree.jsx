import plusAgree from '@icons/plusAgree.svg';
import {  useRef } from 'react';


const ButtonAgree = ({ setImage, setImagesFiles}) => {
	const fileInputRef = useRef(null);

	const handleUpload = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};
	const handleFileChange = async (event) => {
		const file = event.target.files[0];

		if (file) {
			file.preview = URL.createObjectURL(file);
			setImagesFiles(file)
			setImage(file.preview);
		}
	};

	return (
		<>
			<button onClick={handleUpload} >
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
