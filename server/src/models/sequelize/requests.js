const {DataTypes} = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

const name = 'requests'
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const RequestsModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
RequestsModel['findAllData'] = () => {
  return RequestsModel.findAll()
}
RequestsModel['findOneData'] = (id) => {
  return RequestsModel.findByPk(id)
}
RequestsModel['updateData'] = (id, body) => {
  return RequestsModel.update(body, { where: {id} })
}
RequestsModel['removeData'] = (id) => {
  return RequestsModel.destroy({ where: {id} })
}

module.exports = RequestsModel
