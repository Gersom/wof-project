require('dotenv').config()

const DB_ENGINE = process.env.DB_ENGINE
let dbConnect = ()=>null

switch (DB_ENGINE) {
  case "postgresql":
    dbConnect = require("./engines/postgresql")
    break
  case "mongodb":
    dbConnect = require("./engines/mongodb")
    break
  default:
    throw new Error("Environment variable 'DB_ENGINE' is not valid.")
}

module.exports = dbConnect