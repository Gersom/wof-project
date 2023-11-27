require('dotenv').config()

// const DB_ENGINE = process.env.DB_ENGINE
let dbConnect = require("./engines/postgresql")

// switch (DB_ENGINE) {
//   case "postgresql":
//     dbConnect = 
//     break
//   case "mongodb":
//     dbConnect = require("./engines/mongodb")
//     break
//   default:
//     throw new Error("Environment variable 'DB_ENGINE' is not valid.")
// }

module.exports = dbConnect