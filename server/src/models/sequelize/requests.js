const {DataTypes} = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const PostsModel = require("./posts")
const CaregiversModel = require("./caregivers")
const addMethods = require("../utils/addStaticMethods")

//toDo: rename Model
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

// Add relationship
PostsModel.hasMany(RequestsModel)
RequestsModel.belongsTo(PostsModel)

CaregiversModel.hasMany(RequestsModel)
RequestsModel.belongsTo(CaregiversModel)

// add static methods (functions) to model
addMethods(RequestsModel)

module.exports = RequestsModel
