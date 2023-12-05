import { WS_URL } from '@src/common/constants/api';

import  { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '@src/common/store/slices/alertSlice';

const useWsOwner = (role) => {
	const dispatch = useDispatch();
  const [lastProcessedMessage, setLastProcessedMessage] = useState(null);
	const [ws, setWs] = useState(null);

	useEffect(() => {
    if(role !== 'owner') return;
		if (!ws) {
			const newWs = new WebSocket(WS_URL);

			newWs.onopen = () => {
				console.log('connected');
			};

			newWs.onmessage = (event) => {
				// Lógica para manejar mensajes recibidos
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'request_update') {
            if (lastProcessedMessage === data.type) return;
            setLastProcessedMessage(data.type);
            dispatch(
              setAlert({
                message: `¡Hay una nueva oferta para ${data.petName} de ${data.caregiverName}!`,
                type: 'success',
              })
            );
          }
          setLastProcessedMessage(null);
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
	}, [ws , dispatch, role]);

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket connection is not established or is closed');
    }
  };

	return { sendMessage };
};

export default useWsOwner;
