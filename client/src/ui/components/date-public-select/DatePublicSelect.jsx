import styles from './styles.module.scss';
import dateDark from '@icons/dateDark.svg';
import dateDarkEnd from '@icons/dateDarkEnd.svg';
import eyeWhite from '@icons/eyeWhite.svg';
import { useState } from 'react';
import { API_URL_CREATE_POST } from '@src/common/constants/api';
import { useSelector, useDispatch } from 'react-redux';
import { updatePetsTriger } from '@src/common/store/slices/myPetsSlice';
import { setAlert } from '@src/common/store/slices/alertSlice';
import useWsOwner from '@src/common/utils/websocket/useWsOwner';

const DatePublicSelect = ({
	data = {
		startDate: '',
		endDate: '',
		id: 0,
		owner: {
			id: 0,
		},
		pet: {
			id: 0,
		},
		address: '',
	},
	toggleModal,
}) => {
	const dispatch = useDispatch();
	const { sendMessageOwner } = useWsOwner('owner');

	const [startDate, setStartDate] = useState(data.status === 'completed' ? '' :data.startDate?.split('T')[0]);
	const [endDate, setEndDate] = useState(data.status === 'completed' ? '' :data.endDate?.split('T')[0]);
	const address = useSelector((state) => state.userReducer?.user?.address);


	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'startDate') {
			setStartDate(value);
		} else {
			setEndDate(value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = {
			startDate,
			endDate,
			ownerId: data.owner.id,
			petId: data.pet.id,
			address: data.address || address,
		};

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};
		const currentDate = new Date().toISOString().split('T')[0]; // Obtener la fecha actual

		if (!startDate || !endDate) {
			dispatch(setAlert({ message: 'Debes seleccionar una fecha', type: 'warning' }));
			return;
		}

		if (startDate < currentDate) {
			dispatch(setAlert({ message: 'La fecha de inicio no puede ser menor a la fecha actual', type: 'warning' }));
			return;
		}
		if (endDate < startDate) {
			dispatch(setAlert({ message: 'La fecha de fin no puede ser menor a la fecha de inicio', type: 'warning' }));
			return;
		}
		if (startDate > endDate) {
			dispatch(setAlert({ message: 'La fecha de inicio no puede ser mayor a la fecha de fin', type: 'warning' }));
			return;
		}
		if (startDate === endDate) {
			dispatch(setAlert({ message: 'La fecha de inicio no puede ser igual a la fecha de fin', type: 'warning' }));
			return;
		}
		if (startDate && endDate) {
			if (data.status === 'completed'){
				await fetch(`${API_URL_CREATE_POST}`, options);
				dispatch(setAlert({ message: 'Publicación creada', type: 'success' }));
			}
			else if (data.id && data.status === 'published') {
				options.method = 'PUT';
				await fetch(`${API_URL_CREATE_POST}/${data.id}`, options);
				dispatch(setAlert({ message: 'Publicación actualizada', type: 'success' }));
			} else {
				await fetch(API_URL_CREATE_POST, options);
				dispatch(setAlert({ message: 'Publicación creada', type: 'success' }));
			}
			dispatch(updatePetsTriger());
			sendMessageOwner({ type: 'offers_update' });
			toggleModal();
		}
	};

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
					value={startDate || ''}
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
					value={endDate || ''}
					onChange={handleChange}
				/>
				<button onClick={handleSubmit}>
					<img src={eyeWhite} alt='eye' />
					Publicar
				</button>
			</div>
		</section>
	);
};

export default DatePublicSelect;
