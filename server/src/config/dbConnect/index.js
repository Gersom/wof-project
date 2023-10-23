const mongoConnect = require("./mongo")
const mysqlConnect = require("./mysql")
const DB_TYPE = process.env.DB_TYPE || 'nosql'

const dbConnect = () => {
  const dbTypes = {
    nosql: mongoConnect,
    mysql: mysqlConnect
  }
  dbTypes[DB_TYPE]()
}

module.exports = dbConnect