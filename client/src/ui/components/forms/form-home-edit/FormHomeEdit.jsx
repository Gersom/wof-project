import styles from './styles.module.scss';
import user from '@icons/user.svg';

const FormHomeEdit = ({ form, handleChange, errors }) => {
	return (
		<form className={styles.form}>
			<h2>Datos del Cuidador</h2>

			<div>
				<img src={user} alt='user' />
				<label>Experiencias :</label>
			</div>
			<textarea
				type='text'
				name='experiencies'
				value={form.experiencies || ''}
				onChange={handleChange}
				autoComplete='off'
				placeholder='He tenido mascotas toda mi vida, tanto perros como gatos y otros.'
			/>

			<div>
				<img src={user} alt='user' />
				<label>Mi casa :</label>
			</div>
			<textarea
				type='text'
				name='myHouse'
				value={form.myHouse || ''}
				onChange={handleChange}
				autoComplete='off'
				placeholder='Tengo una casa de 2 pisos, vivo con mi pareja, tenemos una habitación para gatos, y otra para perros.'
			/>

			<div>
				<img src={user} alt='user' />
				<label>Notas :</label>
			</div>
			<textarea
				type='text'
				name='notes'
				value={form.notes || ''}
				onChange={handleChange}
				autoComplete='off'
				placeholder='Mis favoritos son los gatos, tengo uno que se llama Ramses.'
			/>
		</form>
	);
};

export default FormHomeEdit;
