const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const OwnersModel = require("./owners")
const PetsModel = require("./pets")
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

CaregiversModel.hasOne(PostsModel, {
  foreignKey: { allowNull: true }
})



PostsModel.belongsTo(CaregiversModel)

// add static methods (functions) to model
addMethods(PostsModel)

PostsModel['findAllData'] = () => {
    return PostsModel.findAll(
    {
      include: [{ model: PetsModel },{model:OwnersModel, include:[{model: UsersModel}]}]
    }
  )
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
