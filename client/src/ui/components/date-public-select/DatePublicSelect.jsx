import styles from './styles.module.scss';
import dateDark from '@icons/dateDark.svg';
import dateGrey from '@icons/dateGrey.svg';
import eyeWhite from '@icons/eyeWhite.svg';

const DatePublicSelect = () => {
	return (
		<section className={styles.datesContainer}>
			<h2>¿cuando deseas que cuiden de tu mascota?</h2>
			<div>
				<h4>Fechas de cuidado</h4>
				<label>
					<img src={dateDark} alt='date' />
					<h5>Fecha de inicio :</h5>
				</label>
				<input
					type='date'
					name='startDate'
					placeholder='04 de Diciembre del 2023'
				/>
				<label>
					<img src={dateDark} alt='date' />
					<h5>Fecha de fin :</h5>
				</label>
				<input
					type='date'
					name='endDate'
					placeholder='07 de Diciembre del 2023'
				/>
				<button>
					<img src={eyeWhite} alt='eye' />
					Publicar
				</button>
			</div>
		</section>
	);
};

export default DatePublicSelect;
