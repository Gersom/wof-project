import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Timer from './timer/Timer';
import { useDispatch } from 'react-redux';
import { setAlert } from '@src/common/store/slices/alertSlice';

const CareInProgress = ({
	startDate = '2023-11-27T05:00:00.000Z',
	endDate = '2023-12-05T05:00:00.000Z',
	image = 'https://wof-server.up.railway.app/pictures/pet1_02.png',
	style = '',
}) => {
	const dispatch = useDispatch();
	const [isTimerExpired, setTimerExpired] = useState(false);
	const [isServiceFinished, setServiceFinished] = useState(false);
	const [isBeforeStartDate, setIsBeforeStartDate] = useState(false);
	const [isStartBtnDisabled, setStartBtnDisabled] = useState(true);

	useEffect(() => {
		const currentDate = new Date();
		const startDateTime = new Date(startDate);
		// Comparar fechas y actualizar el estado.
		setIsBeforeStartDate(currentDate < startDateTime);
	}, [startDate]);

	useEffect(() => {
		// Deshabilitar el botón de "Iniciar Servicio" hasta que el temporizador llegue a cero.
		setStartBtnDisabled(isBeforeStartDate || isTimerExpired);
	}, [isBeforeStartDate, isTimerExpired]);

	const styleContainer = style === 'small' ? styles.mainContainerSmall : styles.mainCont;

	const handleFinishService = () => {
		if (!isServiceFinished && isTimerExpired && !isBeforeStartDate) {
			setServiceFinished(true);
			dispatch(
				setAlert({
					message: '¡Felicidades servicio Finalizado! 😊',
					type: 'success',
				})
			);
		}
	};

	const handleStartService = () => {
		dispatch(setAlert({ message: 'Iniciando servicio', type: 'success' }));
	};

	const timerText =
		isServiceFinished || isTimerExpired
			? '¡SERVICIO FINALIZADO CON ÉXITO😊!'
			: isBeforeStartDate
			? 'RESTANTE PARA QUE INICIE EL CUIDADO DE LA MASCOTA'
			: 'RESTANTE PARA QUE FINALICE EL CUIDADO DE LA MASCOTA';

	return (
		<div className={styleContainer}>
			<div className={styles.firstCont}>
				<img src={image} alt='Imagen de gato' />
			</div>
			<div className={styles.secondCont}>
				<h4 >
					{isServiceFinished && 'Servicio Finalizado'}
					{isTimerExpired && 'Servicio Finalizado'}
					{isBeforeStartDate && 'Servicio no iniciado'}
					{!isServiceFinished &&
						!isTimerExpired &&
						!isBeforeStartDate &&
						'Servicio en progreso'}
				</h4>
				<span className={styles.timeText}>
					Tiempo: <span className={styles.timeText}>{timerText}</span>
				</span>

				{!isServiceFinished && !isTimerExpired && (
					<Timer
						onExpire={() => setTimerExpired(true)}
						isServiceFinished={isServiceFinished}
						expiryTimestamp={new Date(endDate)}
						style={style}
					/>
				)}

				<div className={styles.buttonsCont}>
					<button className={styles.supportBtn}>Soporte</button>
					{isBeforeStartDate ? (
						<button disabled={isStartBtnDisabled} onClick={handleStartService}>
							Iniciar Servicio
						</button>
					) : (
						<button
							disabled={
								!isTimerExpired || isServiceFinished || isBeforeStartDate
							}
							onClick={handleFinishService}
						>
							Finalizar Servicio
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CareInProgress;
