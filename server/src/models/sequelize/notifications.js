const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const addMethods = require("../utils/addStaticMethods")
const UsersModel = require("./users")
const CaregiversModel = require("./caregivers")
const OwnersModel = require("./owners")

const name = 'notifications'
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
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    },

}

const NotificationsModel = sequelize.define(name, schema, config)

// Add relationship
UsersModel.hasMany(NotificationsModel)
NotificationsModel.belongsTo(UsersModel)

CaregiversModel.hasOne(NotificationsModel)
NotificationsModel.belongsTo(CaregiversModel)

OwnersModel.hasOne(NotificationsModel)
NotificationsModel.belongsTo(OwnersModel)

// add static methods (functions) to model
addMethods(NotificationsModel)

module.exports = NotificationsModel
