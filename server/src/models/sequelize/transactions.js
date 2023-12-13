const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const UsersModel = require("./users")
const PostsModel = require("./servicePostings")
const CaregiversModel = require("./caregivers")
const addMethods = require("../utils/addStaticMethods")

const name = 'transactions'
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
  transactionId: {
    type: DataTypes.STRING, allowNull: false,
  },
  amount: {
    type: DataTypes.STRING, allowNull: false,
  },
  currencyCode: {
    type: DataTypes.STRING, allowNull: false,
  },
  name: {
    type: DataTypes.STRING, allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING, allowNull: false,
  },
  email: {
    type: DataTypes.STRING, allowNull: false,
  },
  addressLine: {
    type: DataTypes.STRING, allowNull: false,
  },
  addressArea1: {
    type: DataTypes.STRING, allowNull: false,
  },
  addressArea2: {
    type: DataTypes.STRING, allowNull: false,
  },
  countryCode: {
    type: DataTypes.STRING, allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING, allowNull: false,
  },
  discount: {
    type: DataTypes.STRING, allowNull: true,
  },
  amountPayCaregiver: {
    type: DataTypes.STRING, allowNull: true,
  },
}

const TransactionsModel = sequelize.define(name, schema, config)

// Add relationship
UsersModel.hasMany(TransactionsModel)
TransactionsModel.belongsTo(UsersModel)

PostsModel.hasMany(TransactionsModel)
TransactionsModel.belongsTo(PostsModel)

CaregiversModel.hasMany(TransactionsModel)
TransactionsModel.belongsTo(CaregiversModel)


// add static methods (functions) to model
addMethods(TransactionsModel)

TransactionsModel["findMyWallet"] = async (caregiverId) => {
  const {
    TransactionsModel
  } = require('../index')
  const transactions = await TransactionsModel.findAll({
    where: { caregiverId }
  });
  return transactions;
};

module.exports = TransactionsModel