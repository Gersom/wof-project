import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormPetEdit } from '@src/common/store/slices/formPetEditSlice';

const FormPetEdit = ({ formRef, onSubmit }) => {
	const dispatch = useDispatch();
	const formPetEdit = useSelector(
		(state) => state.formPetEditReducer.formPetEdit
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch(updateFormPetEdit({ name: name, value: value }));
	};

	return (
		<form ref={formRef} onSubmit={onSubmit} className={styles.form}>
			<h2>Datos de la mascota</h2>
			<div>
				<h3>icon</h3>
				<label>Nombre :</label>
			</div>
			<input
				type='text'
				name='name'
				value={formPetEdit.name}
				onChange={handleChange}
			/>
			<div>
				<h3>icon</h3>
				<label>Especie :</label>
			</div>
			<select name='species' value={formPetEdit.species} onChange={handleChange}>
				<option value='perro'>Perro</option>
				<option value='gato'>Gato</option>
			</select>
			<div>
				<h3>icon</h3>
				<label>Raza :</label>
			</div>
			<select name='breed' value={formPetEdit.breed} onChange={handleChange}>
				<option value='pastor Aleman'>pastor Aleman</option>
				<option value='rotate'>rotate</option>
			</select>
			<div>
				<h3>icon</h3>
				<label>Sexo :</label>
			</div>
			<select name='gender' value={formPetEdit.gender} onChange={handleChange}>
				<option value='macho'>Macho</option>
				<option value='hembra'>Hembra</option>
			</select>
			<div>
				<h3>icon</h3>
				<label>Temperamento :</label>
			</div>
			<input type='text' name='temperaments' value={formPetEdit.temperaments} onChange={handleChange}/>
			<div>
				<h3>icon</h3>
				<label>Modales :</label>
			</div>
			<input type='text' name='manners' value={formPetEdit.manners} onChange={handleChange}/>
			<div>
				<h3>icon</h3>
				<label>Notas :</label>
			</div>
			<textarea name='notes'  value={formPetEdit.notes} onChange={handleChange}/>
		</form>
	);
};

export default FormPetEdit;
