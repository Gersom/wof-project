const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const PetsModel = require(`./pets`)
const addMethods = require("../utils/addStaticMethods")

const name = 'petsImages'
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
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const PetsImagesModel = sequelize.define(name, schema, config)

// Add relationship
PetsModel.hasMany(PetsImagesModel)
PetsImagesModel.belongsTo(PetsModel)

// add static methods (functions) to model
addMethods(PetsImagesModel)

PetsImagesModel['removeDataByPet'] = (petId) => {
  return PetsImagesModel.destroy({ where: {petId} })
}

module.exports = PetsImagesModel
