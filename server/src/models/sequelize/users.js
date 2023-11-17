const {DataTypes} = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

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

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_image:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role:{
    type: DataTypes.INTEGER,
    // 1 cuidador
    // 2 dueño
    // 3 admin
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const UsersModel = sequelize.define(name, schema, config)

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
