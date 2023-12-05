import { WS_URL } from '@src/common/constants/api';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionGetOffersOwner } from '@src/common/store/actions/offersActions';
import { setAlert } from '@src/common/store/slices/alertSlice';

const useWsCaregiver = (role) => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);
	const [lastProcessedMessage, setLastProcessedMessage] = useState(null);
	const [ws, setWs] = useState(null);

	useEffect(() => {
		if (role !== 'caregiver') return;
		if (!ws) {
			const newWs = new WebSocket(WS_URL);

			newWs.onopen = () => {
				console.log('connected');
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
					setIsLoading(true);
				} catch (error) {
					console.log(error);
				}
			};

			newWs.onclose = () => {
				console.log('Connection closed');
				setWs(null); // Reiniciar la conexión WebSocket si se cierra
			};

			setWs(newWs);
			setIsLoading(false);
		}

		return () => {
			if (ws) {
				ws.close(); // Cerrar la conexión al desmontar el componente
			}
		};
	}, [ws, dispatch, role, lastProcessedMessage]);

	const sendMessage = (message) => {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify(message));
		} else {
			console.error('WebSocket connection is not established or is closed');
		}
	};

	return { sendMessage };
};

export default useWsCaregiver;
