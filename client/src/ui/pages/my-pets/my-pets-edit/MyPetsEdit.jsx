import styles from './styles.module.scss';
import { Form, useParams } from 'react-router-dom';
import FormPetEdit from '@src/ui/components/forms/form-pet-edit/FormPetEdit';
import CardDisplayImages from '@src/ui/components/cards/card-display-images/CardDisplayImages';
import ButtonsSave from '@src/ui/components/forms/form-pet-edit/atoms/ButtonsSave';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import validation from '@src/ui/components/forms/form-pet-edit/validation';
import { API_URL_MY_PETS } from '@src/common/constants/api';

const MyPetsEdit = () => {
	const { idPet } = useParams();
	const pets = useSelector((state) => state.myPetsReducer.myPets);
	const [images, setImages] = useState([]);
	const [form, setForm] = useState({
		name: '',
		species: '🐶 Perro',
		breed: 'Mestizo',
		gender: 'Macho',
		temperaments: '',
		manners: '',
		notes: '',
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
					species: data.species.name,
					breed: data.breed.name,
					gender: data.breed.name,
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

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.values(error).some((error) => error !== ''))
			return console.log(error);
		else {
			console.log(form);
		}
	};

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
