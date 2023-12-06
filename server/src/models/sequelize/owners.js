const { DataTypes, Op } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const UsersModel = require(`./users`)
const addMethods = require("../utils/addStaticMethods")


const name = 'owners'
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
  rating: {
    type: DataTypes.FLOAT,
    defaultValue:0,
    allowNull:true
  }
}

const OwnersModel = sequelize.define(name, schema, config)

// Add relationship
UsersModel.hasOne(OwnersModel)
OwnersModel.belongsTo(UsersModel)

// add static methods (functions) to model
addMethods(OwnersModel)

OwnersModel['findHiredCaregivers'] = async (id) => {
  const { PostsModel }      = require("../index")
  const { PetsModel }       = require("../index");
  const { CaregiversModel } = require("../index")
  const { UsersModel }      = require("../index")
  const { SpeciesModel }    = require("../index")
  const { BreedsModel }     = require("../index")
  const { RequestsModel }   = require("../index")
  
  const hiredCaregivers = await PostsModel.findAll({where: {ownerId:id,caregiverId:{[Op.not]: null}},
    attributes: ["id","address", "startDate", "endDate"],
    include:[
      {model: CaregiversModel, attributes:["id","rating"], include: {model: UsersModel,attributes:["name","profilePicture"]},},
      {model: PetsModel, attributes: ["name"], include: [{ model: SpeciesModel }, { model: BreedsModel }]},
      {model: RequestsModel,}
    ]
  })

  return hiredCaregivers
}

OwnersModel["findAllOwners"] = async () => {
  const owners = await OwnersModel.findAll({
    include: {
        model: UsersModel
    }
})
return owners
}

OwnersModel["findOwner"] = async (id) => {
  const PetsModel = require("./pets")
  const owner = await OwnersModel.findOne({
    where: { id },
    include: [
      {
        model: UsersModel
      },
      {
        model: PetsModel, attributes:["id","name"]
      }
    ]
  })
  return owner
}
OwnersModel['dataExistByUser'] = async (userId) => {
  const amountData = await OwnersModel.count({
    where: { userId }
  })
  return amountData > 0
}

module.exports = OwnersModel
