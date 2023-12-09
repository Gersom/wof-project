const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnect/engines/postgresql");

const addMethods = require("../utils/addStaticMethods");

const name = "messageChat";

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
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCaregiver: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  isOwner: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
}

const MessagesChatModel = sequelize.define(name, schema, config);

addMethods(MessagesChatModel);



module.exports = MessagesChatModel;