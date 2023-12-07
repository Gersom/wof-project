const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const OwnersModel = require(`./owners`)
const BreedsModel = require(`./breeds`)
const SpeciesModel = require(`./species`)
const GerdersModel = require(`./genders`)
const addMethods = require("../utils/addStaticMethods")
const UsersModel = require("./users")

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
  onPost: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
  const PostsModel = require("./servicePostings")
  const petImages = require("./pets_images")
  const CaregiversModel = require("./caregivers")
  const UsersModel = require("./users")

  return await PetsModel.findAll({
    where: ownerId ? { ownerId } : {},
    attributes: ["id", "name", "temperaments", "manners", "notes"],
    include: [
      { model: OwnersModel, include: [{ model: UsersModel, attributes: ["name", "lastName"] }] },
      { model: BreedsModel, attributes: ["id","name"] },
      { model: SpeciesModel, attributes: ["id","name", "icon"] },
      { model: GerdersModel, attributes: ["id","name"] },
      { 
        model: PostsModel, 
        attributes: ["id", "status", "startDate", "endDate", "address"],
        include: [{ 
          model: CaregiversModel, 
          include: [{ 
            model: UsersModel, 
          }]
        }]
      },
      { model: petImages, attributes: ["imageUrl"] }
    ]
  })
}

PetsModel["findPet"] = async (id) => {
  const pet = await PetsModel.findByPk(id, {
    attributes: ["id", "name", "temperaments", "manners", "notes"],
    include: [
      { model: OwnersModel, attributes: ["id"], include: [{ model: UsersModel, attributes: ["name", "lastName"] }] },
      { model: BreedsModel, attributes: ["id"] },
      { model: SpeciesModel, attributes: ["id"] },
      { model: GerdersModel, attributes: ["id"] },
    ]
  })
  const PetImages = await pet.getPetsImages()
  const data = { ...pet.toJSON(), imageUrl: PetImages }
  return data
}

PetsModel["createPet"] = async (data) => {
  // const { imageUrl } = data
  const newPet = await PetsModel.create(data)
  // if (imageUrl) {

  //   newPet.createPetsImage({ imageUrl })
  // }
  return newPet
}

module.exports = PetsModel
