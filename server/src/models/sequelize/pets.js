const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const OwnersModel = require(`./owners`)
const BreedsModel = require(`./breeds`)
const SpeciesModel = require(`./species`)
const GerdersModel = require(`./genders`)
const addMethods = require("../utils/addStaticMethods")
const UsersModel = require("./users")
const PetsImagesModel = require("./pets_images")
// const PostsModel = require("./posts")

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

GerdersModel.hasMany(PetsModel)
PetsModel.belongsTo(GerdersModel)

// add static methods (functions) to model
addMethods(PetsModel)

PetsModel["createPet"] = async (data) => {
  return await PetsModel.create(data)
}

PetsModel["findAllPets"] = async (ownerId) => {
  const PostsModel = require("./posts")
  if(ownerId){
    const pets = await PetsModel.findAll({
      where:{ownerId},
      attributes:["id","name","temperaments","manners","notes"],
      include: [
        {model: OwnersModel, attributes:["id"], include:[{model: UsersModel, attributes:["name","lastName"]}]},
        {model: BreedsModel, attributes:["name"]},
        {model: SpeciesModel, attributes:["name"]},
        {model: GerdersModel, attributes:["name"]},
        {model: PostsModel},
      ]
    })
    return pets
  }
  const pets = await PetsModel.findAll({
    where:{ownerId},
    attributes:["id","name","temperaments","manners","notes"],
    include: [
      {model: OwnersModel, attributes:["id"], include:[{model: UsersModel, attributes:["name","lastName"]}]},
      {model: BreedsModel, attributes:["name"]},
      {model: SpeciesModel, attributes:["name"]},
      {model: GerdersModel, attributes:["name"]},
      {model: PostsModel},
    ]
  })
  return pets

}

PetsModel["findPet"] = async (id) => {
  const pet = await PetsModel.findByPk(id,{
    attributes:["id","name","temperaments","manners","notes"],
    include:[
      {model: OwnersModel, attributes:["id"], include:[{model: UsersModel, attributes:["name","lastName"]}]},
      {model: BreedsModel, attributes:["name"]},
      {model: SpeciesModel, attributes:["name"]},
      {model: GerdersModel, attributes:["name"]},
    ]
  })
  const PetImages = await pet.getPetsImages()
  const data = {...pet.toJSON(),imageUrl:PetImages}
  return data
}

PetsModel["createPet"] = async (data) => {
  const { imageUrl } = data
  const newPet = await PetsModel.create(data)
  if(imageUrl){
    newPet.createPetsImage({imageUrl})
  }
  return newPet
}

module.exports = PetsModel
