const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const OwnersModel = require(`./owners`)
const CaregiversModel = require(`./caregivers`)
const UsersModel = require("./users")
const addMethods = require("../utils/addStaticMethods")

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
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const ReviewsModel = sequelize.define(name, schema, config)

// Add relationship
CaregiversModel.hasOne(ReviewsModel)
ReviewsModel.belongsTo(CaregiversModel)

OwnersModel.hasOne(ReviewsModel)
ReviewsModel.belongsTo(OwnersModel)

// add static methods (functions) to model
addMethods(ReviewsModel)

ReviewsModel['findByOwner'] = (ownerId) => {
  return ReviewsModel.findAll({
    where: { ownerId },
    attributes: [ 
      "id", "comment", ["createdAt", "date"] 
    ],
    include: [{
      model: CaregiversModel,
      attributes: ["id"],
      include: [{
        model: UsersModel,
        attributes: ["name", "profilePicture"]
      }]
    }]
  })
}

module.exports = ReviewsModel
