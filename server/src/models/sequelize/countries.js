const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const addMethods = require("../utils/addStaticMethods")

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
  domain: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  iconUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const CountriesModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
addMethods(CountriesModel)

module.exports = CountriesModel
