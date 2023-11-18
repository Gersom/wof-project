const {DataTypes} = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const OwnersModel = require("./owners")
const PetsModel = require("./pets")
const CaregiversModel = require("./caregivers")

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
