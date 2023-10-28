require('dotenv').config()
const mongoose = require("mongoose")
const { buildURI } = require("../../../utils/dbBuildURI")

const database = process.env.MONGO_DATABASE
const username = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const uri = process.env.MONGO_URI 

const mongoConnect = async () => {
  const DB_URI = buildURI({uri, database, username, password})
  const options = { useNewUrlParser: true }
  
  try {
    await mongoose.connect(DB_URI, options)      
    console.log('*** MONGO DB CONNECTED. ***\n')
  } catch (error) {
    console.log('*** MONGO DB CONEXION ERROR ***\n')
    console.log(error.message)
  }
}

module.exports = { dbConnect: mongoConnect }