import styles from './styles.module.scss';
import dateDark from '@icons/dateDark.svg';
import dateDarkEnd from '@icons/dateDarkEnd.svg';
import eyeWhite from '@icons/eyeWhite.svg';
import {useState} from 'react';

const DatePublicSelect = ({
	data = {
		startDate: '',
		endDate: '',
	},
}) => {
	const [startDate, setStartDate] = useState(data.startDate?.split('T')[0]);
	const [endDate, setEndDate] = useState(data.endDate?.split('T')[0]);
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'startDate') {
			setStartDate(value);
		} else {
			setEndDate(value);
		}
	}

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
					id='dateInputStart'
					value={startDate}
					onChange={handleChange}
				/>
				<label>
					<img src={dateDarkEnd} alt='date' />
					<h5>Fecha de fin :</h5>
				</label>
				<input
					type='date'
					name='endDate'
					placeholder='07 de Diciembre del 2023'
					id='dateInputEnd'
					value={endDate}
					onChange={handleChange}
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
