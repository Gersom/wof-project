require('dotenv').config()
const { Sequelize } = require("sequelize")
const { buildURI } = require("../../../utils/dbBuildURI")

const database = process.env.PG_DATABASE
const username = process.env.PG_USER
const password = process.env.PG_PASSWORD
const host = process.env.PG_HOST
const uri = process.env.PG_URI

const modeServer = process.env.MODE

const sequelize = new Sequelize(
  buildURI({ uri, database, username, password, host }),
  { logging: false } // Disable SQL log messages
)

const dbConnectPostgresql = async () => {
  try {
    await sequelize.authenticate()
    console.log('*** PostgreSQL SUCCESS CONEXION ***');

    let optionsSequelize = { force: true }
    if (modeServer === 'prod') optionsSequelize = {}
    
    await sequelize.sync();
    console.log('- Models synchronization completed');
  } catch (e) {
    console.error('\n*** PostgreSQL ERROR CONEXION ***\n\n', e.message)
  }
}

module.exports = {
  sequelize, dbConnect: dbConnectPostgresql
}