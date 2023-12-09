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
    defaultValue: 0,
    allowNull: true
  },
  recievedBalance: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  dueBalance: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  emailPaypal: {
    type: DataTypes.STRING,
    allowNull: true
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
    where: { caregiverId: id }, attributes: ["id", "address", "startDate", "endDate"],
    include: [
      { model: PetsModel, attributes: ["name"], include: [{ model: SpeciesModel }, { model: BreedsModel }] },
      { model: OwnersModel, include: [{ model: UsersModel, attributes: ["name", "profilePicture"] },] }
    ],
  })
  return caredPets
}

CaregiversModel["findWallet"] = async (id) => {
  const { PostsModel } = require("../index")
  const { RequestsModel } = require("../index")
  const { OwnersModel } = require("../index")
  const { UsersModel } = require("../index")
  const { PetsModel } = require("../index")
  const { SpeciesModel } = require("../index")

  const wallet = await CaregiversModel.findOne({
    where: { id }, attributes: ["id", "recievedBalance", "dueBalance", "emailPaypal"],
    include: [
      {
        model: RequestsModel, attributes: ["id", "price"], include: [
          {
            model: PostsModel, attributes: ["endDate"], include: [
              { model: OwnersModel, include: { model: UsersModel, attributes: ["name","profilePicture"] } },
              { model: PetsModel, attributes: ["name"], include: { model: SpeciesModel, attributes: ["name"] } }
            ]
          }
        ]
      }
    ]
  })

  const clients = wallet?.serviceRequests?.map(c => {
    return {
      price     : c.price,
      endDate   : c.servicePosting?.endDate,
      client    : c.servicePosting?.owner?.user?.name,
      imgClient : c.servicePosting?.owner?.user?.profilePicture,
      petName   : c.servicePosting?.pet?.name,
      petSpecie : c.servicePosting?.pet?.species?.name,
    }
  })
  const formatted = {
    id                : wallet?.id,
    recievedBalance   : wallet?.recievedBalance,
    dueBalance        : wallet?.dueBalance,
    emailPaypal       : wallet?.emailPaypal,
    clients           : clients
  }

  return formatted
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
