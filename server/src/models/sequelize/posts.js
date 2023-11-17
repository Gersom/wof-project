const {DataTypes} = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

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
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}

const PostsModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
PostsModel['findAllData'] = () => {
  return PostsModel.findAll()
}
PostsModel['findOneData'] = (id) => {
  return PostsModel.findByPk(id)
}
PostsModel['updateData'] = (id, body) => {
  return PostsModel.update(body, { where: {id} })
}
PostsModel['removeData'] = (id) => {
  return PostsModel.destroy({ where: {id} })
}

module.exports = PostsModel
