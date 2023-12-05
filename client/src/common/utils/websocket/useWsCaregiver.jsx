import { WS_URL } from '@src/common/constants/api';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionGetOffersOwner } from '@src/common/store/actions/offersActions';
import { useLocation } from 'react-router-dom';

const useWsCaregiver = () => {
	const dispatch = useDispatch();
  const location = useLocation();

	const [ws, setWs] = useState(null);

	useEffect(() => {
    if(!location.pathname.includes('caregivers')) return;
		if (!ws) {
			const newWs = new WebSocket(WS_URL);

			newWs.onopen = () => {
				console.log('connected');
			};

			newWs.onmessage = (event) => {
				// Lógica para manejar mensajes recibidos
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'newOffer') {
            dispatch(actionGetOffersOwner());
          }
        } catch (error) {
          console.log(error);
        }
			};

			newWs.onclose = () => {
				console.log('Connection closed');
				setWs(null); // Reiniciar la conexión WebSocket si se cierra
			};

			setWs(newWs);
		}

		return () => {
			if (ws) {
				ws.close(); // Cerrar la conexión al desmontar el componente
			}
		};
	}, [ws , dispatch, location.pathname]);

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket connection is not established or is closed');
    }
  };

	return;
};

export default useWsCaregiver;
