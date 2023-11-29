const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const SpeciesModel = require("./species")
const addMethods = require("../utils/addStaticMethods")

const name = 'breeds'
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

const BreedsModel = sequelize.define(name, schema, config)

// Add relationship
SpeciesModel.hasMany(BreedsModel)
BreedsModel.belongsTo(SpeciesModel)

// add static methods (functions) to model
addMethods(BreedsModel)
BreedsModel['findAllBySpecies'] = (speciesId) => {
  return BreedsModel.findAll({
    where: {speciesId}
  })
}

module.exports = BreedsModel
