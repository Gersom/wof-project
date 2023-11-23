const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnect/engines/postgresql");

const ProvincesModel = require(`./provinces`);
const CountriesModel = require(`./countries`);

const addMethods = require("../utils/addStaticMethods");
const generateServerPath = require("./../../utils/generateServerPath");
const { path: serverPath } = generateServerPath();
const bcrypt = require("bcrypt");

const name = "users";
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    // 1 caregivers
    // 2 owner
    // 3 admin
  },

  profilePicture: {
    type: DataTypes.STRING,
    defaultValue: `${serverPath}/pictures/profile.png`,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cellPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

const UsersModel = sequelize.define(name, schema, config);
UsersModel.beforeCreate(async (user) => {
  const saltRounds = 10;
  user.password = await bcrypt.hash(user.password, saltRounds);
});
UsersModel.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Add relationship
ProvincesModel.hasMany(UsersModel);
UsersModel.belongsTo(ProvincesModel);

CountriesModel.hasOne(UsersModel);
UsersModel.belongsTo(CountriesModel);

// add static methods (functions) to model
addMethods(UsersModel);

UsersModel["findAllUsers"] = async () => {
  const User = await UsersModel.findAll({
    include: [
      { model: CountriesModel, attributes: ["name"] },
      { model: ProvincesModel, attributes: ["name"] },
    ],
  });
  return User;
};

UsersModel["createUser"] = async (data) => {
  const newUser = await UsersModel.create(data);
  return newUser;
};

module.exports = UsersModel;
