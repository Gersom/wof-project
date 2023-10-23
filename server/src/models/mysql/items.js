const {DataTypes} = require("sequelize")

const ItemsModel = (sequelize) => {
  sequelize.define(
    "items",
    {
      id: {
        type: DataTypes.UUID, // "123n123-124n1243-1243n12"
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {timestamps: true} // createAt, updateAt
  )
}

module.exports = ItemsModel