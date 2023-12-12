const WebSocket = require("ws");

const { ChatModel } = require("../models");

const configureWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  // const clients = new Set(); // Keep track of clients
  const clients = [];

  const sendToAllClients = (message) => {
    clients.forEach((client) => {
      client.ws.send(message);
    });
  };
  const sendToAllCaregivers = (message) => {
    clients.forEach((client) => {
      if (client.role === "caregiver") {
        client.ws.send(message);
      }
    });
  };
  const sendToCaregiver = (message, caregiverId) => {
    clients.forEach((client) => {
      if (client.role === "caregiver" && client.caregiverId == caregiverId) {
        client.ws.send(message);
      }
    });
  };
  const sendToOwner = (message, ownerId) => {
    clients.forEach((client) => {
      if (client.role == "owner" && client.ownerId == ownerId) {
        client.ws.send(message);
        console.log('enviado a owner', ownerId)
      }
    });
  };

  const sendToBothById = (message, caregiverId, ownerId) => {
    clients.forEach((client) => {
      if (client.role === "caregiver" && client.caregiverId == caregiverId) {
        client.ws.send(message);
      } else if (client.role === "owner" && client.ownerId == ownerId) {
        client.ws.send(message);
      }
    });
  };

  // Event listeners



  const clientAddOwner = (ws, role, ownerId) => {
    let exist = false;
    clients.forEach((client, index) => {
      if (client.role === role && client.ownerId == ownerId) {
        exist = true;
        console.log('owner existente')
      }
    });
    if (!exist) clients.push({ ws, role, ownerId }); // Agrega un nuevo elemento si no existe
    console.log("New client connected", clients.length);
  };

  const clientAddCaregiver = (ws, role, caregiverId) => {
    let exist = false;
    clients.forEach((client, index) => {
      if (client.role === role && client.caregiverId == caregiverId) {
        exist = true;
      }
    });
    if (!exist) clients.push({ ws, role, caregiverId }); // Agrega un nuevo elemento si no existe
    console.log("New client connected", clients.length);
  }

  wss.on("listening", () => {
    console.log("Websocket server running");
  });

  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      if (typeof message === "string") {
        console.log("Mensaje recibido (string):", message);

        try {
          const parsedMessage = JSON.parse(message);
          console.log("Mensaje JSON:", parsedMessage);

          // Realiza acciones con el mensaje JSON
        } catch (error) {
          console.error("Error al analizar el mensaje JSON:", error);
        }
      } else if (message instanceof Buffer) {
        // Si es un Buffer, conviértelo a una cadena de texto
        const bufferText = message.toString("utf8");
        console.log("Mensaje recibido (Buffer):", bufferText);

        try {
          const parsedMessage = JSON.parse(bufferText);
          if (parsedMessage.type === "register" && parsedMessage.role === "owner") {
              clientAddOwner(ws, parsedMessage.role, parsedMessage.ownerId);
          } else if (parsedMessage.type === "register" && parsedMessage.role === "caregiver") {
            clientAddCaregiver(ws, parsedMessage.role, parsedMessage.caregiverId); 
          }
          
          else {
            if (parsedMessage.type === "offers_update") {
              sendToAllCaregivers(bufferText);
            } else if (parsedMessage.type === "payment_complete") {
              sendToCaregiver(bufferText, parsedMessage.caregiverId);
            } else if (parsedMessage.type === "request_update") {
              sendToOwner(bufferText, parsedMessage.ownerId);
            } else if (
              parsedMessage.type === "message" &&
              parsedMessage.role === "caregiver"
            ) {
              const msg = await ChatModel.createMessageCaregiver(
                parsedMessage.message,
                parsedMessage.caregiverId,
                parsedMessage.ownerId,
                parsedMessage.image
              );
              const msgToJson = JSON.stringify({
                ...msg.dataValues,
                type: "message",
              });

              sendToBothById(
                msgToJson,
                parsedMessage.caregiverId,
                parsedMessage.ownerId
              );
            } else if (
              parsedMessage.type === "message" &&
              parsedMessage.role === "owner"
            ) {
              const msg = await ChatModel.createMessageOwner(
                parsedMessage.message,
                parsedMessage.caregiverId,
                parsedMessage.ownerId,
                parsedMessage.image
              );

              const msgToJson = JSON.stringify({
                ...msg.dataValues,
                type: "message",
              });

              sendToBothById(
                msgToJson,
                parsedMessage.caregiverId,
                parsedMessage.ownerId
              );
            } else if (parsedMessage.type === "update_message") {
              sendToBothById(
                bufferText,
                parsedMessage.caregiverId,
                parsedMessage.ownerId
              );
            }
          }
        } catch (error) {
          console.error("Error al analizar el mensaje JSON:", error);
        }
      }
    });

    ws.on("close", () => {
      const filteredClients = clients.filter((client) => client.ws !== ws);
      clients.length = 0;
      clients.push(...filteredClients);
      console.log("Client disconnected", clients.length);
    });

    
  });
  // Función para enviar mensajes a todos los clientes conectados

  return wss;
};

module.exports = configureWebSocket;
