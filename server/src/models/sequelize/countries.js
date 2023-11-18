const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

const name = 'countries'
const config = { 
  timestamps: false, // createAt, updateAt
  freezeTableName: true
}
const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const CountriesModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
CountriesModel['findAllData'] = () => {
  return CountriesModel.findAll()
}
CountriesModel['findOneData'] = (id) => {
  return CountriesModel.findByPk(id)
}
CountriesModel['updateData'] = (id, body) => {
  return CountriesModel.update(body, { where: {id} })
}
CountriesModel['removeData'] = (id) => {
  return CountriesModel.destroy({ where: {id} })
}

module.exports = CountriesModel
