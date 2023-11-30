import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import FormPetEdit from '@src/ui/components/forms/form-pet-edit/FormPetEdit';
import CardDisplayImages from '@src/ui/components/cards/card-display-images/CardDisplayImages';
import ButtonsSave from '@src/ui/components/forms/form-pet-edit/atoms/ButtonsSave';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import validation from '@src/ui/components/forms/form-pet-edit/validation';
import { API_URL_MY_PETS , API_URL_MY_PETS_OWNER_ID } from '@src/common/constants/api';


const MyPetsEdit = () => {
	const { idPet } = useParams();
	const pets = useSelector((state) => state?.myPetsReducer?.myPets);
	const ownerId = useSelector((state) => state?.userReducer?.user?.owner?.id);
	const [images, setImages] = useState([]);
	const [form, setForm] = useState({
		name: '',
		speciesId: 1,
		breedId: 1,
		genderId: 1,
		temperaments: '',
		manners: '',
		notes: '',
		ownerId: pets[0]?.owner?.id,
	});

	const [error, setError] = useState(null);
 
	useEffect(() => {
		setError(validation(form));
	},[form])

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
				});
				setImages(data.imageUrl);
				
			};
			getPet();
		}
	}, [idPet, pets]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e,) => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form),
		}
		e.preventDefault();
		if (Object.values(error).some((error) => error !== ''))
			return console.log(error);
		else {
			if (idPet) {
				options.method = 'PUT';
				const response = await fetch(`${API_URL_MY_PETS}/${idPet}`, options);
				const data = await response.json();
				console.log(data);
			}
			else {
				const response = await fetch(API_URL_MY_PETS_OWNER_ID + ownerId, options);
				const data = await response.json();
				console.log(data);
			}
		}
	}

	return (
		<div className={styles.mainContainer}>
			<h1>Mi mascota: Peluche</h1>
			<div className={styles.gridContainer}>
				<FormPetEdit form={form} handleChange={handleChange} errors={error} />
				<CardDisplayImages data={images} />
			</div>
			<ButtonsSave onSubmit={handleSubmit} />
		</div>
	);
};

export default MyPetsEdit;
