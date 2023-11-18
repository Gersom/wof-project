const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

const name = 'provinces'
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
}

const ProvincesModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
ProvincesModel['findAllData'] = () => {
  return ProvincesModel.findAll()
}
ProvincesModel['findOneData'] = (id) => {
  return ProvincesModel.findByPk(id)
}
ProvincesModel['updateData'] = (id, body) => {
  return ProvincesModel.update(body, { where: {id} })
}
ProvincesModel['removeData'] = (id) => {
  return ProvincesModel.destroy({ where: {id} })
}

module.exports = ProvincesModel
