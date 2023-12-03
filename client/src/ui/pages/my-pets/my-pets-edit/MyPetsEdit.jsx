import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import FormPetEdit from '@src/ui/components/forms/form-pet-edit/FormPetEdit';
import CardDisplayImages from '@src/ui/components/cards/card-display-images/CardDisplayImages';
import ButtonsSave from '@src/ui/components/forms/form-pet-edit/atoms/ButtonsSave';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import validation from '@src/ui/components/forms/form-pet-edit/validation';
import {
	API_URL_MY_PETS,
	API_URL_MY_PETS_OWNER_ID,
} from '@src/common/constants/api';
import { setAlert } from '@src/common/store/slices/alertSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import handleImageUpload from '@src/ui/components/cloudinary/imageUpload';
import routerNames from '@src/common/constants/routes';

const MyPetsEdit = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { idPet } = useParams();
	const pets = useSelector((state) => state?.myPetsReducer?.myPets);
	const ownerId = useSelector((state) => state?.userReducer?.user?.owner?.id);

	const [form, setForm] = useState({
		name: '',
		speciesId: 1,
		breedId: 1,
		genderId: 1,
		temperaments: '',
		manners: '',
		notes: '',
		ownerId: ownerId,
		imageUrl: [],
	});
	const [error, setError] = useState({
		name: '',
		temperaments: '',
		manners: '',
		notes: '',
	});
	const [imagesFiles, setImagesFiles] = useState([]);
	const [imagesLocal , setImagesLocal] = useState([]);

	useEffect(() => {
		if (idPet) {
			const getPet = async () => {
				const response = await fetch(`${API_URL_MY_PETS}/${idPet}`);
				const data = await response.json();
				setForm({
					name: data.name,
					speciesId: data.species.id,
					breedId: data.breed.id,
					genderId: data.gender.id,
					temperaments: data.temperaments,
					manners: data.manners,
					notes: data.notes,
					imageUrl: data.imageUrl.map((image) => image.imageUrl),
				});
			};
			getPet();
		}
	}, [idPet, pets]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
		const updateError = validation(name, value, error);
		setError({ ...error, ...updateError });
	};

	const handleDeleteImage = (image) => {
		const newImages = form.imageUrl.filter((img) => img !== image);
		const newImagesLocal = imagesLocal.filter((img) => img !== image);
		const findIndex = imagesLocal.findIndex((img) => img === image);
		const newImagesFiles = imagesFiles.filter((img, index) => index !== findIndex);
		setImagesFiles(newImagesFiles);
		setForm({ ...form, imageUrl: newImages });
		setImagesLocal(newImagesLocal);
		dispatch(setAlert({ message: 'Imagen eliminada', type: 'success' }));
	};

	const handleSetImage = (image) => {
		setImagesLocal([...imagesLocal, image]);
		dispatch(setAlert({ message: 'Imagen agregada', type: 'success' }));
	};


	const handleSubmit = async (e) => {
		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form),
		};
		e.preventDefault();

		const updatedErrors = {};

		const isFormChanged = Object.keys(form).some((key) => form[key] !== '');
		const isFormEmpty = Object.keys(form).some((key) => form[key] === '');

		if (isFormChanged) {
			for (const key in form) {
				if (error[key] === undefined) continue;
				const updateError = validation(key, form[key], error);
				updatedErrors[key] = updateError[key];
				if (error[key] !== '') {
					setTimeout(() => {
						dispatch(setAlert({ message: `${error[key]}`, type: 'error' }));
					}, 10);
				}
			}
			setError(updatedErrors);
			if (isFormEmpty) return;
		}

		if (Object.values(error).some((error) => error !== '')) return;
		
		if(form.imageUrl.length === 0 && imagesLocal.length === 0) return dispatch(setAlert({ message: 'Debe agregar al menos una imagen 👀', type: 'warning' }));

		if (imagesFiles.length > 0) {
			dispatch(setAlert({ message: 'Estamos actualizando tu mascota...😊', type: 'success' }));
			const imageUrls = await Promise.all(
				imagesFiles.map(async (image) => await handleImageUpload(image))
			)
			options.body = JSON.stringify({ ...form, imageUrl: [...form.imageUrl, ...imageUrls] });
		}

		const url = idPet ? `${API_URL_MY_PETS}/${idPet}` : API_URL_MY_PETS;
		options.method = idPet ? 'PUT' : 'POST';

		await fetch(url, options);

		const successMessage = idPet ? `${form.name} ha sido editado` : `${form.name} ha sido creado`;
		dispatch(setAlert({ message: successMessage, type: 'success' }));

		navigate(routerNames['myPets']);
	}

	return (
		<div className={styles.mainContainer}>
			<h1>Mi mascota: Peluche</h1>
			<div className={styles.gridContainer}>
				<FormPetEdit form={form} handleChange={handleChange} errors={error} />
				<CardDisplayImages
					data={form.imageUrl}
					imagesLocal={imagesLocal}
					setImage={handleSetImage}
					handleDeleteImage={handleDeleteImage}
					setImagesFiles={(image) => setImagesFiles([...imagesFiles, image])}
				/>
			</div>
			<ButtonsSave onSubmit={handleSubmit} />
		</div>
	);
};

export default MyPetsEdit;
