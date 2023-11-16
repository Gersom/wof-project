const {DataTypes} = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

const name = 'reviews'
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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const ReviewsModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
ReviewsModel['findAllData'] = () => {
  return ReviewsModel.findAll()
}
ReviewsModel['findOneData'] = (id) => {
  return ReviewsModel.findByPk(id)
}
ReviewsModel['updateData'] = (id, body) => {
  return ReviewsModel.update(body, { where: {id} })
}
ReviewsModel['removeData'] = (id) => {
  return ReviewsModel.destroy({ where: {id} })
}

module.exports = ReviewsModel
