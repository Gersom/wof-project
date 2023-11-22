const {DataTypes} = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const OwnersModel = require("./owners")
const PetsModel = require("./pets")
const CaregiversModel = require("./caregivers")
const addMethods = require("../utils/addStaticMethods")

const name = 'posts'
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
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}

const PostsModel = sequelize.define(name, schema, config)

// Add relationship
OwnersModel.hasMany(PostsModel)
PostsModel.belongsTo(OwnersModel)

PetsModel.hasOne(PostsModel)
PostsModel.belongsTo(PetsModel)

CaregiversModel.hasOne(PostsModel, {
  foreignKey: { allowNull: true }
})
PostsModel.belongsTo(CaregiversModel)

// add static methods (functions) to model
addMethods(PostsModel)

module.exports = PostsModel
