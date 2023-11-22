const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const OwnersModel = require(`./owners`)
const BreedsModel = require(`./breeds`)

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
}

const PetsModel = sequelize.define(name, schema, config)

// Add relationship
OwnersModel.hasMany(PetsModel)
PetsModel.belongsTo(OwnersModel)

BreedsModel.hasMany(PetsModel)
PetsModel.belongsTo(BreedsModel)

// add static methods (functions) to model
PetsModel['findAllData'] = () => {
  return PetsModel.findAll()
}
PetsModel['findOneData'] = (id) => {
  return PetsModel.findByPk(id)
}
PetsModel['updateData'] = (id, body) => {
  return PetsModel.update(body, { where: {id} })
}
PetsModel['removeData'] = (id) => {
  return PetsModel.destroy({ where: {id} })
}

module.exports = PetsModel
