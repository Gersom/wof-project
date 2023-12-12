const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const TransactionsModel = require("./transactions")
const PostsModel = require("./servicePostings")
const CaregiversModel = require("./caregivers")
const addMethods = require("../utils/addStaticMethods")

const name = 'caregiverTransactions'
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
  email: {
    type: DataTypes.STRING, allowNull: false,
  },
  productId: {
    type: DataTypes.STRING, allowNull: false,
  },
  currencyCode: {
    type: DataTypes.STRING, allowNull: false,
  },
  originalAmount: {
    type: DataTypes.STRING, allowNull: false,
  },
  amountPaid: {
    type: DataTypes.STRING, allowNull: false,
  },
  percentage: {
    type: DataTypes.STRING, allowNull: false,
  },
  revenue: {
    type: DataTypes.STRING, allowNull: false,
  },
}

const CaregiverTransactionsModel = sequelize.define(name, schema, config)


// add static methods (functions) to model
addMethods(CaregiverTransactionsModel)

// Add relationship
TransactionsModel.hasOne(CaregiverTransactionsModel)
CaregiverTransactionsModel.belongsTo(TransactionsModel)

PostsModel.hasMany(CaregiverTransactionsModel)
CaregiverTransactionsModel.belongsTo(PostsModel)

CaregiversModel.hasMany(CaregiverTransactionsModel)
CaregiverTransactionsModel.belongsTo(CaregiversModel)

module.exports = CaregiverTransactionsModel