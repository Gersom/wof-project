const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

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
}

const OwnersModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
OwnersModel['findAllData'] = () => {
  return OwnersModel.findAll()
}
OwnersModel['findOneData'] = (id) => {
  return OwnersModel.findByPk(id)
}
OwnersModel['updateData'] = (id, body) => {
  return OwnersModel.update(body, { where: {id} })
}
OwnersModel['removeData'] = (id) => {
  return OwnersModel.destroy({ where: {id} })
}

module.exports = OwnersModel
