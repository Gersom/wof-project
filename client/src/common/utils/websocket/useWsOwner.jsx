import { WS_URL } from "@src/common/constants/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@src/common/store/slices/alertSlice";
import { setWs } from "@src/common/store/slices/wsSlice";
import routerNames from "@src/common/constants/routes";
import { useLocation } from "react-router-dom";

const useWsOwner = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [lastProcessedMessage, setLastProcessedMessage] = useState(null);

  const ownerId = useSelector((state) => state.userReducer.user?.owner?.id);
  const ROLE = useSelector((state) => state?.userReducer?.user?.role);
  const wsOwner = useSelector((state) => state.wsReducer.ws);

  useEffect(() => {
    if (ROLE !== "owner") return;
    let reconectInternal;

    const connectWebSocket = () => {
      const newWs = new WebSocket(WS_URL);

      newWs.onopen = () => {
        console.log("connected");
        newWs.send(
          JSON.stringify({
            type: "register",
            role: "owner",
            ownerId: ownerId,
          })
        );
      };

      newWs.onmessage = (event) => {
        // Lógica para manejar mensajes recibidos
        try {
          const data = JSON.parse(event.data);
          if (data.type === "request_update" && data.ownerId === ownerId) {
            if (lastProcessedMessage === data.type) return;
            setLastProcessedMessage(data.type);
            dispatch(
              setAlert({
                message: `¡Hay una nueva oferta para ${data.petName} de ${data.caregiverName}!`,
                type: "success",
              })
            );
          }
          setLastProcessedMessage(null);
        } catch (error) {
          console.log(error);
        }
      };

      newWs.onclose = () => {
        console.log("Connection closed");
        dispatch(setWs(null)); // Reiniciar la conexión WebSocket si se cierra

        reconectInternal = setInterval(() => {
          connectWebSocket();
        }, 10000);
      };

      dispatch(setWs(newWs));
    };
    if (ROLE === "owner" && !wsOwner) {
      connectWebSocket();
    }

    return () => {
      if (reconectInternal) {
        clearInterval(reconectInternal);
      }
      if (wsOwner && routerNames["landing"] === location.pathname) {
        wsOwner.close(); // Cerrar la conexión al desmontar el componente
      }
    };
  }, [
    dispatch,
    ROLE,
    lastProcessedMessage,
    location.pathname,
    ownerId,
    wsOwner,
  ]);

  const sendMessageOwner = (message) => {
    if (wsOwner && wsOwner.readyState === WebSocket.OPEN) {
      wsOwner.send(JSON.stringify(message));
    } else {
      console.error("WebSocket connection is not established or is closed");
    }
  };

  return { sendMessageOwner, wsOwner };
};

export default useWsOwner;
