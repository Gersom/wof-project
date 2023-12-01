const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const addMethods = require("../utils/addStaticMethods")
const UsersModel = require("./users")

const name = 'admin'
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

const AdminModel = sequelize.define(name, schema, config)

UsersModel.hasOne(AdminModel)
AdminModel.belongsTo(UsersModel)

// add static methods (functions) to model
addMethods(AdminModel)

module.exports = AdminModel