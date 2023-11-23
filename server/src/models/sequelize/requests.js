const {DataTypes} = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const PostsModel = require("./posts")
const CaregiversModel = require("./caregivers")
const addMethods = require("../utils/addStaticMethods")

//toDo: rename Model
const name = 'requests'
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
  price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}

const RequestsModel = sequelize.define(name, schema, config)

// Add relationship
PostsModel.hasMany(RequestsModel)
RequestsModel.belongsTo(PostsModel)

CaregiversModel.hasMany(RequestsModel)
RequestsModel.belongsTo(CaregiversModel)

// add static methods (functions) to model
addMethods(RequestsModel)

RequestsModel['createData'] = async (data) => {
  // Crear el registro en RequestsModel
  const newRequest = await RequestsModel.create(data);

  // Establecer la relación con PostsModel
  if (data.postId) {
    const post = await PostsModel.findByPk(data.postId);
    if (post) {
      await newRequest.setPost(post);
    }
  }

  // Establecer la relación con CaregiversModel
  if (data.caregiverId) {
    const caregiver = await CaregiversModel.findByPk(data.caregiverId);
    if (caregiver) {
      await newRequest.setCaregiver(caregiver);

      // Establecer el caregiver en el modelo PostsModel
      if (data.postId) {
        await PostsModel.update({ caregiverId: data.caregiverId }, { where: { id: data.postId } });
      }
    }
  }

  return newRequest;
}



module.exports = RequestsModel
