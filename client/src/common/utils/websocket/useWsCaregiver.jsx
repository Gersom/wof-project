import { WS_URL } from '@src/common/constants/api';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetOffersOwner } from '@src/common/store/actions/offersActions';
import { setAlert } from '@src/common/store/slices/alertSlice';

const useWsCaregiver = (role) => {
	const dispatch = useDispatch();
	
	const [lastProcessedMessage, setLastProcessedMessage] = useState(null);
	const [wsCaregiver, setWsCaregiver] = useState(null);

	const caregiverId = useSelector((state) => state.userReducer.user?.caregiver?.id);

	useEffect(() => {
		if (role !== 'caregiver') return;

		if (!wsCaregiver) {
			const newWs = new WebSocket(WS_URL);

			newWs.onopen = () => {
				console.log('connected');
				newWs.send(
					JSON.stringify({
						type: 'register',
						role: 'caregiver',
						caregiverId : caregiverId,
					})
				);
			};

			newWs.onmessage = (event) => {
				// Lógica para manejar mensajes recibidos
				try {
					const data = JSON.parse(event.data);
					if (data.type === 'offers_update') {
						if (lastProcessedMessage === data.type) return;

						setLastProcessedMessage(data.type);

						dispatch(actionGetOffersOwner());
						dispatch(
							setAlert({
								message: 'Hay ofertas nuevas disponiples 😊',
								type: 'success',
							})
						);
						setLastProcessedMessage(null);
					}

					//
					if(data.type === 'payment_complete'){
						if (lastProcessedMessage === data.type) return;
						setLastProcessedMessage(data.type);
						dispatch(actionGetOffersOwner());
						dispatch(
							setAlert({
								message: `El pago de ${data.petName} ha sido realizado por ${data.ownerName}`,
								type: 'success',
							})
						);
						setLastProcessedMessage(null);
					}
				} catch (error) {
					console.log(error);
				}
			};

			newWs.onclose = () => {
				console.log('Connection closed');
				setWsCaregiver(null); // Reiniciar la conexión WebSocket si se cierra
			};

			setWsCaregiver(newWs);
		}

		return () => {
			if (wsCaregiver) {
				wsCaregiver.close(); // Cerrar la conexión al desmontar el componente
			}
		};
	}, [wsCaregiver, dispatch, role, lastProcessedMessage]);

	const sendMessageCaregiver = (message) => {
		if (wsCaregiver && wsCaregiver.readyState === WebSocket.OPEN) {
			wsCaregiver.send(JSON.stringify(message));
		} else {
			console.error('WebSocket connection is not established or is closed');
		}
	};

	return { sendMessageCaregiver, wsCaregiver };
};

export default useWsCaregiver;
