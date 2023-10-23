// const mongoose = require("mongoose")

const mongoConnect = async () => {
  // const DB_URI = process.env.DB_URI
  // const options = { useNewUrlParser: true }
  
  // try {
  //   await mongoose.connect(DB_URI, options)      
  //   console.log('*** MONGO DB CONNECTED. ***\n')
  // } catch (error) {
  //   console.log('*** MONGO DB CONEXION ERROR ***\n')
  //   console.log(error)
  // }

  console.log('\nMongo database not configured.')
}

module.exports = mongoConnect