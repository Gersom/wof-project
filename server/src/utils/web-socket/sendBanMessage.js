

let clients = [];

const setClients = (newClients) => {
  clients = newClients;
};

const sendBanMessage = (userId) => {
  console.log("SEND MESSAGE TO ID:", userId);
  clients.forEach((client) => {
    if (client.userId == userId) {
      console.log("FOUND CLIENT:", client.userId, userId);
      client.ws.send(JSON.stringify({ type: 'ban_user', userId }));
    }
  });
};

module.exports = { sendBanMessage, setClients };
