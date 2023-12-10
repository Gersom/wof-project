const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const OwnersModel = require(`./owners`)
const CaregiversModel = require(`./caregivers`)
const UsersModel = require("./users")
const addMethods = require("../utils/addStaticMethods")
const averageRating = require("../../utils/averageRating")

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
    where: { ownerId, to:'owner' },
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

ReviewsModel['findByCaregiver'] = (caregiverId) => {
  return ReviewsModel.findAll({
    where: { caregiverId, to:'caregiver' },
    attributes: [ 
      "id", "comment", ["createdAt", "date"] 
    ],
    include: [{
      model: OwnersModel,
      attributes: ["id"],
      include: [{
        model: UsersModel,
        attributes: ["name", "profilePicture"]
      }]
    }]
  })
}

ReviewsModel['createReview'] = async (data) => {
  const { ReviewsModel } = require("../index")
  
  const newReview = await ReviewsModel.create(data)
  
  if(data.to === "caregiver"){
    const { CaregiversModel } = require("../index")
    const reviewsCaregiver = await ReviewsModel.findAll({where: {caregiverId:data.caregiverId}})

    averageRating(reviewsCaregiver,CaregiversModel,data.caregiverId)
  }
  if(data.to === "owner"){
    const { OwnersModel } = require("../index");
    const reviewsOwner = await ReviewsModel.findAll({where:{ownerId:data.ownerId}})

    averageRating(reviewsOwner,OwnersModel,data.ownerId)
  }

  return newReview
}

module.exports = ReviewsModel
