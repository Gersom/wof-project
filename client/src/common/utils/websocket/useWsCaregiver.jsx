import { WS_URL } from "@src/common/constants/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetOffersOwner } from "@src/common/store/actions/offersActions";
import { setAlert } from "@src/common/store/slices/alertSlice";
import { setWs, setTryReconnect } from "@src/common/store/slices/wsSlice";
import routerNames from "@src/common/constants/routes";
import { useLocation } from "react-router-dom";
import { setMsgChat, setChat , setChatTrigger } from "@src/common/store/slices/chatSlice";

const useWsCaregiver = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [lastProcessedMessage, setLastProcessedMessage] = useState(null);
  const caregiverId = useSelector(
    (state) => state.userReducer.user?.caregiver?.id
  );
  const wsCaregiver = useSelector((state) => state.wsReducer.ws);
  const ROLE = useSelector((state) => state?.userReducer?.user?.role);
  const tryReconnect = useSelector((state) => state.wsReducer.tryReconnect);

  useEffect(() => {
    if (ROLE !== "caregiver") return;

    const connectWebSocket = () => {
      const newWs = new WebSocket(WS_URL);
      if (!wsCaregiver) {
        newWs.onopen = () => {
          console.log("connected");
          newWs.send(
            JSON.stringify({
              type: "register",
              role: "caregiver",
              caregiverId: caregiverId,
            })
          );
        };
        dispatch(setWs(newWs));
      }

      newWs.onclose = () => {
        console.log("Connection closed");

        dispatch(setWs(null)); // Reiniciar la conexión WebSocket si se cierra
      };
    };
    if (ROLE === "caregiver" && !wsCaregiver) {
      if (tryReconnect === 0) {
        connectWebSocket();
        dispatch(setTryReconnect());
      }
    }
    return () => {
      if (wsCaregiver && routerNames["landing"] === location.pathname) {
        wsCaregiver.close();
      }
    };
  }, [
    dispatch,
    tryReconnect,
    wsCaregiver,
    location.pathname,
    ROLE,
    caregiverId,
  ]);

  useEffect(() => {
    if (wsCaregiver) {
      wsCaregiver.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "offers_update") {
            if (lastProcessedMessage === data.type) return;

            setLastProcessedMessage(data.type);

            dispatch(actionGetOffersOwner());
            dispatch(
              setAlert({
                message: "Hay ofertas nuevas disponiples 😊",
                type: "success",
              })
            );
            setLastProcessedMessage(null);
          } 
           if (data.type === "message") {
            dispatch(setMsgChat(data));
            if (data.isOwner) {
              dispatch(setChat({ id: data.chatId }));
            }
          }
          if (data.type === "update_message") {
            dispatch(setChatTrigger(Math.random()));
          }

          if (data.type === "payment_complete") {
            if (lastProcessedMessage === data.type) return;
            setLastProcessedMessage(data.type);
            dispatch(actionGetOffersOwner());
            dispatch(
              setAlert({
                message: `El pago de ${data.petName} ha sido realizado por ${data.ownerName}`,
                type: "success",
              })
            );
            setLastProcessedMessage(null);
          }
        } catch (error) {
          console.log(error);
        }
      };
    }
  }, [dispatch, lastProcessedMessage, wsCaregiver]);

  const sendMessageCaregiver = (message) => {
    if (wsCaregiver) {
      wsCaregiver.send(JSON.stringify(message));
    } else {
      console.error("WebSocket connection is not established or is closed");
    }
  };

  return { sendMessageCaregiver, wsCaregiver };
};

export default useWsCaregiver;
