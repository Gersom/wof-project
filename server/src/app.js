const express = require("express");
const middlewares = require("./config/middlewares");
const listen = require("./config/listen");
const { dbConnect } = require("./config/dbConnect");
const insertData = require("./services/database");
const configureWebSocket = require("./config/webSocketServer");

const app = express();

const server = require("http").Server(app);

// Websocket server
configureWebSocket(server);

// MIDDLEWARES
middlewares(app);
// ROUTES
// http://localhost/api/
app.use("/api", require("./routes"));

// NOT FOUND
app.use((_, res) => {
  res.status(404).json({
    error: "Unconfigured route, please review the documentation.",
  });
});

// LISTEN
listen(server, async () => {
  // Database conexion
  await dbConnect();

  // Insert into Database.
  await insertData();
});


