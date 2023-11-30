const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const CaregiversModel = require(`./caregivers`)
const addMethods = require("../utils/addStaticMethods")

const name = 'caregiversImages'
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

const CaregiversImagesModel = sequelize.define(name, schema, config)

// Add relationship
CaregiversModel.hasMany(CaregiversImagesModel)
CaregiversImagesModel.belongsTo(CaregiversModel)

// add static methods (functions) to model
addMethods(CaregiversImagesModel)

CaregiversImagesModel['removeDataByCaregiver'] = (caregiverId) => {
  return CaregiversImagesModel.destroy({ where: {caregiverId} })
}


module.exports = CaregiversImagesModel
