const DB_ENGINE = process.env.DB_ENGINE
let pathModel = ''

switch (DB_ENGINE) {
  case "postgresql":
    pathModel = 'sequelize'
    break
  case "mongodb":
    pathModel = 'mongoose'
    break
  default:
    throw new Error("Environment variable 'DB_ENGINE' is not valid.")
}

const models = {
  usersModel: require(`./${pathModel}/users`),
  ProvincesModel: require(`./${pathModel}/provinces`)
}

module.exports = models