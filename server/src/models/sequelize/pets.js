const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const OwnersModel = require(`./owners`)
const BreedsModel = require(`./breeds`)
const SpeciesModel = require(`./species`)
const addMethods = require("../utils/addStaticMethods")

const name = 'pets'
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
  temperaments: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  manners: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
}

const PetsModel = sequelize.define(name, schema, config)

// Add relationship
OwnersModel.hasMany(PetsModel)
PetsModel.belongsTo(OwnersModel)

BreedsModel.hasMany(PetsModel)
PetsModel.belongsTo(BreedsModel)

SpeciesModel.hasMany(PetsModel)
PetsModel.belongsTo(SpeciesModel)

// add static methods (functions) to model
addMethods(PetsModel)

module.exports = PetsModel
