const {DataTypes} = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

const name = 'pets'
const config = { 
  timestamps: true, // createAt, updateAt
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
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const PetsModel = sequelize.define(name, schema, config)

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
