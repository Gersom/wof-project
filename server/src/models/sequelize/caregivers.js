const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

const name = 'caregivers'
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
  experiencies: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}

const CaregiversModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
CaregiversModel['findAllData'] = () => {
  return CaregiversModel.findAll()
}
CaregiversModel['findOneData'] = (id) => {
  return CaregiversModel.findByPk(id)
}
CaregiversModel['updateData'] = (id, body) => {
  return CaregiversModel.update(body, { where: {id} })
}
CaregiversModel['removeData'] = (id) => {
  return CaregiversModel.destroy({ where: {id} })
}

module.exports = CaregiversModel
