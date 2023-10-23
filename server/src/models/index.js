const DB_TYPE = process.env.DB_TYPE || 'nosql'

const models = {
  itemsModel: require(`./${DB_TYPE}/items`)
}

module.exports = models