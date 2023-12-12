import { WS_URL } from "@src/common/constants/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@src/common/store/slices/alertSlice";
import { setWs, setTryReconnect } from "@src/common/store/slices/wsSlice";
import routerNames from "@src/common/constants/routes";
import { useLocation } from "react-router-dom";
import {
  setMsgChat,
  setChatTrigger,
} from "@src/common/store/slices/chatSlice";

const useWsOwner = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [lastProcessedMessage, setLastProcessedMessage] = useState(null);

  const ownerId = useSelector((state) => state.userReducer.user?.owner?.id);
  const wsOwner = useSelector((state) => state.wsReducer.ws);
  const ROLE = useSelector((state) => state?.userReducer?.user?.role);
  const tryReconnect = useSelector((state) => state.wsReducer.tryReconnect);

  useEffect(() => {
    if (ROLE !== "owner") return;

    const connectWebSocket = () => {
      const newWs = new WebSocket(WS_URL);

      if (!wsOwner) {
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
        dispatch(setWs(newWs));
      }

      newWs.onclose = () => {
        console.log("Connection closed");

        dispatch(setWs(null));
      };
    };

    if (ROLE === "owner" && !wsOwner) {
      if (tryReconnect === 0) {
        connectWebSocket();
        dispatch(setTryReconnect());
      }
    }

    return () => {
      if (wsOwner && routerNames["landing"] === location.pathname) {
        wsOwner.close();
      }
    };
  }, [dispatch, tryReconnect, wsOwner, location.pathname, ROLE]);

  useEffect(() => {
    if (wsOwner) {
      wsOwner.onmessage = (event) => {
        // Lógica para manejar mensajes recibidos
        try {
          const data = JSON.parse(event.data);
          console.log(data);

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
          if (data.type === "message") {
            setMsgChat(data);

          }
          if (data.type === "update_message") {
            dispatch(setChatTrigger(Math.random()));
          }
          setLastProcessedMessage(null);
        } catch (error) {
          console.log(error);
        }
      };
    }
  }, [wsOwner, dispatch, ownerId, lastProcessedMessage]);

  const sendMessageOwner = (message) => {
    if (wsOwner) {
      wsOwner.send(JSON.stringify(message));
    } else {
      console.error("WebSocket connection is not established or is closed");
    }
  };

  return { sendMessageOwner };
};

export default useWsOwner;
