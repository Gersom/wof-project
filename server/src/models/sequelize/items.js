const {DataTypes} = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

const name = 'items'
const config = { 
  timestamps: true, // createAt, updateAt
  freezeTableName: true
}
const schema = {
  id: {
    type: DataTypes.UUID, // "123n123-124n1243-1243n12"
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const ItemsModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
ItemsModel['findAllData'] = () => {
  return ItemsModel.findAll()
}
ItemsModel['findOneData'] = (id) => {
  return ItemsModel.findByPk(id)
}
ItemsModel['updateData'] = (id, body) => {
  return ItemsModel.update(body, { where: {id} })
}
ItemsModel['removeData'] = (id) => {
  return ItemsModel.destroy({ where: {id} })
}

module.exports = ItemsModel
