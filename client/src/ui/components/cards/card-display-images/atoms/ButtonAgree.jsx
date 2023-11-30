import plusAgree from '@icons/plusAgree.svg';
import {  useRef } from 'react';
import handleImageUpload from '@src/ui/components/cloudinary/imageUpload';

const ButtonAgree = ({ setImage}) => {
	const fileInputRef = useRef(null);

	const handleUpload = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};
	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
			const imageUrl = await handleImageUpload(file);
			setImage(imageUrl);
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
