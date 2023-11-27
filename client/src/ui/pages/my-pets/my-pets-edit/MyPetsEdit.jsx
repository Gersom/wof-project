import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import FormPetEdit from '@src/ui/components/forms/form-pet-edit/FormPetEdit';
import CardDisplayImages from '@src/ui/components/cards/card-display-images/CardDisplayImages';
import ButtonsSave from '@src/ui/components/forms/form-pet-edit/atoms/ButtonsSave';
import { useState, useEffect } from 'react';
import validation from '@src/ui/components/forms/form-pet-edit/validation';

const MyPetsEdit = () => {
	const { idPet } = useParams();

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
		if (idPet) {
			// fetch(`http://localhost:3001/api/pets/${idPet}`)
			// 	.then((res) => res.json())
			// 	.then((data) => {
			// 		setForm(data);
			// 	});
		}
	}, [idPet]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
		setError(validation(form));
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
				<CardDisplayImages />
			</div>
			<ButtonsSave onSubmit={handleSubmit} />
		</div>
	);
};

export default MyPetsEdit;
