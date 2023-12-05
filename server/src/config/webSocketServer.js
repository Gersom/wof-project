const WebSocket = require('ws');

const configureWebSocket = (server) => {
	const wss = new WebSocket.Server({ server });
	const clients = new Set(); // Keep track of clients

	const sendToAllClients = (message) => {
		clients.forEach((client) => {
			client.send(message);
		});
	};

	wss.on('listening', () => {
		console.log('Websocket server running');
	});

	wss.on('connection', (ws) => {
		clients.add(ws);

        console.log('------------------------->',clients)
        
		ws.on('message', (message) => {
            if (typeof message === 'string') {
                console.log('Mensaje recibido (string):', message);
        
                try {
                    const parsedMessage = JSON.parse(message);
                    console.log('Mensaje JSON:', parsedMessage);
        
                    // Realiza acciones con el mensaje JSON
                } catch (error) {
                    console.error('Error al analizar el mensaje JSON:', error);
                }
            } else if (message instanceof Buffer) {
                // Si es un Buffer, conviértelo a una cadena de texto
                const bufferText = message.toString('utf8');
                console.log('Mensaje recibido (Buffer):', bufferText);

                sendToAllClients(bufferText);
        
                // Realiza acciones con el contenido del Buffer
            }
        });

		ws.on('close', () => {
			clients.delete(ws);
		});
        console.log('New client connected', clients.size);
	});
	// Función para enviar mensajes a todos los clientes conectados


	return wss;
};

module.exports = configureWebSocket;
