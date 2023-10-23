// const cors = require("cors")
const express = require("express")

// MIDDLEWARES
const middlewares = (app) => {
  // app.use(cors())
  app.use(express.json())
  // app.use('/files', express.static(__dirname + '/storage'));
  app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods", 
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
  });

}

module.exports = middlewares