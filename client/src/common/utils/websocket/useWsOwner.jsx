import { WS_URL } from '@src/common/constants/api';

import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '@src/common/store/slices/alertSlice';

const useWsOwner = (role) => {
	const dispatch = useDispatch();
  const [lastProcessedMessage, setLastProcessedMessage] = useState(null);
	const [wsOwner, setWsOwner] = useState(null);
  const ownerId = useSelector((state) => state.userReducer.user?.owner?.id)

	useEffect(() => {
    if(role !== 'owner') return;
		if (!wsOwner) {
			const newWs = new WebSocket(WS_URL);

			newWs.onopen = () => {
				console.log('connected');
        newWs.send(
          JSON.stringify({
            type: 'register',
            role: 'owner',
            ownerId : ownerId,
          })
        );
			};

			newWs.onmessage = (event) => {
				// Lógica para manejar mensajes recibidos
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'request_update' && data.ownerId === ownerId) {
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
				setWsOwner(null); // Reiniciar la conexión WebSocket si se cierra
			};

			setWsOwner(newWs);
		}

		return () => {
			if (wsOwner) {
				wsOwner.close(); // Cerrar la conexión al desmontar el componente
			}
		};
	}, [wsOwner , dispatch, role,lastProcessedMessage]);

  const sendMessageOwner = (message) => {
    if (wsOwner && wsOwner.readyState === WebSocket.OPEN) {
      wsOwner.send(JSON.stringify(message));
    } else {
      console.error('WebSocket connection is not established or is closed');
    }
  };

	return { sendMessageOwner, wsOwner };
};

export default useWsOwner;
