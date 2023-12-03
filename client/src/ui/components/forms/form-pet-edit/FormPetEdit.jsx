import styles from './styles.module.scss';
import user from '@icons/user.svg';
import mix from '@icons/mix.svg';
import useGetBreeds from '@src/common/hooks/useGetBreeds';
const FormPetEdit = ({ form, handleChange, errors }) => {
	const { breeds, isLoading } = useGetBreeds(form.speciesId);

	const styleErrors = (name) => {
		if (errors && name) {
			if (errors[name].length > 0) {
				return styles.error;
			} else {
				return styles.section;
			}
		}
	};

	return (
		<form className={styles.form}>
			<h2>Datos de la mascota</h2>

			<div>
				<img src={user} alt='user' />
				<label>Nombre :</label>
			</div>
			<section className={styleErrors('name')}>
				<input
					type='text'
					name='name'
					value={form.name}
					onChange={handleChange}
					autoComplete='off'
					placeholder='¿Como se llama tu mascota?'
				/>
				{<span>{errors?.name ? errors?.name : 't'}</span>}
			</section>

			<div>
				<img src={mix} alt='pet' />
				<label>Especie :</label>
			</div>
			<select name='speciesId' value={form.speciesId} onChange={handleChange}>
				<option value='1' id='1'>
					🐶 Perro
				</option>
				<option value='2' id='2'>
					🐯 Gato
				</option>
			</select>

			<div>
				<img src={mix} alt='pet' />
				<label>Raza :</label>
			</div>
			<select name='breedId' value={form.breedId} onChange={handleChange}>
				{!isLoading &&
					breeds.map((breed) => (
						<option key={breed.id} value={breed.id}>
							{breed.name}
						</option>
					))}
			</select>

			<div>
				<img src={mix} alt='pet' />
				<label>Género :</label>
			</div>
			<select name='genderId' value={form.genderId} onChange={handleChange}>
				<option value='1'>♂️ Macho</option>
				<option value='2'>♀️ Hembra</option>
			</select>

			<div>
				<img src={user} alt='user' />
				<label>Temperamento :</label>
			</div>
			<section className={styleErrors('temperaments')}>
				<input
					type='text'
					name='temperaments'
					value={form.temperaments}
					onChange={handleChange}
					autoComplete='off'
					placeholder='¿Juega mucho?, ¿Se enoja mucho?'
				/>
				{<span>{errors?.temperaments ? errors?.temperaments : 't'}</span>}
			</section>

			<section className={styleErrors('manners')}>
				<div>
					<img src={user} alt='user' />
					<label>Modales :</label>
				</div>
				<input
					type='text'
					name='manners'
					value={form.manners}
					onChange={handleChange}
					autoComplete='off'
					placeholder='¿Cómo se comporta?'
				/>
				{<span>{errors?.manners ? errors?.manners : 't'}</span>}
			</section>

			<section className={styleErrors('notes')}>
				<div>
					<img src={user} alt='user' />
					<label>Notas :</label>
				</div>
				<textarea
					name='notes'
					value={form.notes}
					onChange={handleChange}
					autoComplete='off'
					placeholder='¿Hay algo que el cuidador necesite saber?, por ejemplo alergias o cuidados especiales.'
				/>
				{<span>{errors?.notes ? errors?.notes : 't'}</span>}
			</section>
		</form>
	);
};

export default FormPetEdit;
