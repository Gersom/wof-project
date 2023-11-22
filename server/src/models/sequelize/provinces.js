const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const CountriesModel = require(`./countries`)
const addMethods = require("../utils/addStaticMethods")

const name = 'provinces'
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

const ProvincesModel = sequelize.define(name, schema, config)

// Add relationship
CountriesModel.hasMany(ProvincesModel)
ProvincesModel.belongsTo(CountriesModel)

// add static methods (functions) to model
addMethods(ProvincesModel)

module.exports = ProvincesModel
