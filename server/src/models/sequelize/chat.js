const { DataTypes } = require('sequelize')
const { sequelize } = require("../../config/dbConnect/engines/postgresql");

const MessagesChatModel = require(`./messageChat`);

const addMethods = require("../utils/addStaticMethods");

const name = "chat";
const config = {
  timestamps: true, // createAt, updateAt
  freezeTableName: true,
};

const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  caregiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  caregiverName : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerName : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caregiverAvatar : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerAvatar : {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const ChatModel = sequelize.define(name, schema, config);

addMethods(ChatModel);

//relations
ChatModel.hasMany(MessagesChatModel)
MessagesChatModel.belongsTo(ChatModel)



//methods


ChatModel['getAllMessagesByOwnerId'] = async function (ownerId) {
  const chats = await ChatModel.findAll({
    where: {
      ownerId
    },include: [
      {
        model: MessagesChatModel,
        attributes : ['message', 'createdAt', 'isOwner', 'isCaregiver'],
      }
    ]
  })

  return chats
}

ChatModel['getAllMessagesByCaregiverId'] = async function (caregiverId) {
  const chats = await ChatModel.findAll({
    where: {
      caregiverId
    },include: [
      {
        model: MessagesChatModel,
        attributes : ['message', 'createdAt', 'isOwner', 'isCaregiver'],
      }
    ]
  })

  return chats
  
}


ChatModel['getAllMessagesByBothId'] = async function (caregiverId, ownerId) {
  const chat = await ChatModel.findOne({
    where: {
      caregiverId,
      ownerId
    }
  })
  if (!chat) return null
  const messages = await MessagesChatModel.findAll({
    where: {
      chatId: chat.id
    }
  })
  return messages
}

ChatModel['createMessageOwner'] = async function (message, caregiverId, ownerId) {
  const chat = await ChatModel.findOne({
    where: {
      caregiverId,
      ownerId
    }
  })
  if (!chat) return null

  const messageChat = await MessagesChatModel.create({
    message : message,
    isOwner: true,
    chatId: chat.id
  })

  return messageChat
}

ChatModel['createMessageCaregiver'] = async function (message, caregiverId, ownerId) {
  const chat = await ChatModel.findOne({
    where: {
      caregiverId,
      ownerId
    }
  })
  if (!chat) return null
  const messageChat = await MessagesChatModel.create({
    message : message,
    isCaregiver: true,
    chatId: chat.id
  })
  return messageChat
}

module.exports = ChatModel;
