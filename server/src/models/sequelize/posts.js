const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const OwnersModel = require("./owners")
const PetsModel = require("./pets")
const PetsImagesModel = require("./pets_images")
const CaregiversModel = require("./caregivers")
const addMethods = require("../utils/addStaticMethods")
const UsersModel = require("./users");

//toDo:rename model
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
    allowNull: true,
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

CaregiversModel.hasOne(PostsModel)
PostsModel.belongsTo(CaregiversModel)

// add static methods (functions) to model
addMethods(PostsModel)

PostsModel['findAllOffers'] = () => {
  return PostsModel.findAll({
    attributes: [ "id", "address", "startDate", "endDate" ],
    include: [
      { 
        model: PetsModel,
        attributes: [ "id", "name" ],
        include: [{model: PetsImagesModel}]
      },
      { 
        model: OwnersModel,
        attributes: [ "id", "userId" ],
        include: [{
          model: UsersModel,
          attributes: [ "id", "name" ],
        }]
      }
    ]
  })
}

PostsModel['createData']=async(data)=>{
  return await PostsModel.create({
      title: data.title,
      description: data.description,
      address: data.address,
      startDate: data.startDate,
      endDate: data.endDate,
      ownerId: data.ownerid,
      petId: data.petid,
      caregiverId: data.caregiverId
  });
}

module.exports = PostsModel
