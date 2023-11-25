import styles from './styles.module.scss';
import { useState,useEffect } from 'react';
import user from '@icons/user.svg';
import mix from '@icons/mix.svg';

const FormPetEdit = ({ formRef, onSubmit, data }) => {
	const [form, setForm] = useState({
		name: '',
		species: '',
		breed: '',
		gender: '',
		temperaments: '',
		manners: '',
		notes: '',
	});
	useEffect(() => {
		
		if (data) {
			setForm((prevForm) => ({
				...prevForm,
				...data, 
			}));
		}
	}, [data]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	return (
		<form ref={formRef} onSubmit={onSubmit} className={styles.form}>
			<h2>Datos de la mascota</h2>

			<div>
				<img src={user} alt='user' />
				<label>Nombre :</label>
			</div>
			<input
				type='text'
				name='name'
				value={form.name}
				onChange={handleChange}
			/>

			<div>
				<img src={mix} alt='pet' />
				<label>Especie :</label>
			</div>
			<select name='species' value={form.species} onChange={handleChange}>
				<option value='🐶 Perro'>🐶 Perro</option>
				<option value='🐯 Gato'>🐯 Gato</option>
			</select>

			<div>
				<img src={mix} alt='pet' />
				<label>Raza :</label>
			</div>
			<select name='breed' value={form.breed} onChange={handleChange}>
				<option value='pastor Aleman'>pastor Aleman</option>
				<option value='rotate'>rotate</option>
			</select>

			<div>
				<img src={mix} alt='pet' />
				<label>Sexo :</label>
			</div>
			<select name='gender' value={form.gender} onChange={handleChange}>
				<option value='macho'>♂️ Macho</option>
				<option value='hembra'>♀️ Hembra</option>
			</select>

			<div>
				<img src={user} alt='user' />
				<label>Temperamento :</label>
			</div>
			<input
				type='text'
				name='temperaments'
				value={form.temperaments}
				onChange={handleChange}
			/>

			<div>
				<img src={user} alt='user' />
				<label>Modales :</label>
			</div>
			<input
				type='text'
				name='manners'
				value={form.manners}
				onChange={handleChange}
			/>

			<div>
				<img src={user} alt='user' />
				<label>Notas :</label>
			</div>
			<textarea name='notes' value={form.notes} onChange={handleChange} />
		</form>
	);
};

export default FormPetEdit;