const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const addMethods = require("../utils/addStaticMethods")

const name = 'species'
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
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const SpeciesModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
addMethods(SpeciesModel)

module.exports = SpeciesModel
