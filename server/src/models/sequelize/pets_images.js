const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

const name = 'pets_images'
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
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const PetsImagesModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
PetsImagesModel['findAllData'] = () => {
  return PetsImagesModel.findAll()
}
PetsImagesModel['findOneData'] = (id) => {
  return PetsImagesModel.findByPk(id)
}
PetsImagesModel['updateData'] = (id, body) => {
  return PetsImagesModel.update(body, { where: {id} })
}
PetsImagesModel['removeData'] = (id) => {
  return PetsImagesModel.destroy({ where: {id} })
}

module.exports = PetsImagesModel
