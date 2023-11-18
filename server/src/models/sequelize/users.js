const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const ProvincesModel = require(`./provinces`)

const name = 'users'
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role:{
    allowNull: false,
    type: DataTypes.STRING,
    // 1 caregivers
    // 2 owner
    // 3 admin
  },

  profileImage:{
    type: DataTypes.STRING,
    allowNull: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cellPhone:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}

const UsersModel = sequelize.define(name, schema, config)

// Add relationship
ProvincesModel.hasMany(UsersModel)
UsersModel.belongsTo(ProvincesModel)

// add static methods (functions) to model
UsersModel['findAllData'] = () => {
  return UsersModel.findAll()
}
UsersModel['findOneData'] = (id) => {
  return UsersModel.findByPk(id)
}
UsersModel['updateData'] = (id, body) => {
  return UsersModel.update(body, { where: {id} })
}
UsersModel['removeData'] = (id) => {
  return UsersModel.destroy({ where: {id} })
}

module.exports = UsersModel
