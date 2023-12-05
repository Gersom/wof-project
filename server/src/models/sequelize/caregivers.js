const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const UsersModel = require(`./users`)
const addMethods = require("../utils/addStaticMethods")

const name = 'caregivers'
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
  experiencies: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  myHouse: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue:0,
    allowNull:true
  }
}

const CaregiversModel = sequelize.define(name, schema, config)

// Add relationship
UsersModel.hasOne(CaregiversModel)
CaregiversModel.belongsTo(UsersModel)

// add static methods (functions) to model
addMethods(CaregiversModel)

CaregiversModel["findCaredPets"] = async (id) => {
  const { PostsModel } = require("../index");
  const { PetsModel } = require("../index");
  const { OwnersModel } = require("../index");
  const { UsersModel } = require("../index");
  const { SpeciesModel } = require("../index");
  const { BreedsModel } = require("../index");

  const caredPets = await PostsModel.findAll({
    where: { caregiverId: id }, attributes: ["address", "startDate", "endDate"],
    include: [
      { model: PetsModel, attributes: ["name"], include: [{ model: SpeciesModel }, { model: BreedsModel }] },
      { model: OwnersModel, include: [{ model: UsersModel, attributes: ["name", "profilePicture"] },] }
    ],
  })
  return caredPets
}

CaregiversModel["findAllCaregivers"] = async () => {
  const caregivers = await CaregiversModel.findAll({
    include: [
      { model: UsersModel },
    ]
  })
  return caregivers
}

CaregiversModel["findCaregiver"] = async (id) => {
  const CaregiversImagesModel = require("./caregivers_images")
  const caregiver = await CaregiversModel.findOne({
    where: { id },
    include: [
      { model: UsersModel },
      { model: CaregiversImagesModel, attributes: ["imageUrl"] }
    ]
  })
  return caregiver
}
CaregiversModel['dataExistByUser'] = async (userId) => {
  const amountData = await CaregiversModel.count({
    where: { userId }
  })
  return amountData > 0
}

module.exports = CaregiversModel
