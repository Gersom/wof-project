const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

const name = 'breeds'
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

const BreedsModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
BreedsModel['findAllData'] = () => {
  return BreedsModel.findAll()
}
BreedsModel['findOneData'] = (id) => {
  return BreedsModel.findByPk(id)
}
BreedsModel['updateData'] = (id, body) => {
  return BreedsModel.update(body, { where: {id} })
}
BreedsModel['removeData'] = (id) => {
  return BreedsModel.destroy({ where: {id} })
}

module.exports = BreedsModel
