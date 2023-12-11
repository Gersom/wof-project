const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnect/engines/postgresql");

const ProvincesModel = require(`./provinces`);
const CountriesModel = require(`./countries`);

const addMethods = require("../utils/addStaticMethods");
const generateUrl = require("./../../utils/generateUrl");
const bcrypt = require("bcrypt");

const name = "users";
const config = {
  timestamps: true, // createAt, updateAt
  freezeTableName: true,
  paranoid: true,
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
    defaultValue: generateUrl('/pictures/profile.png'),
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

UsersModel.prototype.comparePassword = async function (password) {
  const pass = await bcrypt.compare(password, this.password);
  return pass
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
  const { email, name, password } = data
  if(!email || !name || !password) throw Error("missing data")
  const emailUser = await UsersModel.findOne({where:{email}})
  if(emailUser) throw Error("the email already exists")
  const newUser = await UsersModel.create(data);
  return newUser;
};

UsersModel["findUserById"] = async (userId) => {
  const OwnersModel = require(`./owners`);
  const CaregiversModel = require(`./caregivers`);

  const newUser = await UsersModel.findByPk(userId, {
    include: [
      { 
        model: CaregiversModel,
      },
      { 
        model: OwnersModel
      }
    ]
  })
  return newUser;
};

UsersModel["deleteUser"] = async (userId) => {
  const userToDelete = await UsersModel.findByPk(userId);
  
  if (!userToDelete) {
    throw new Error("User not found");
  }

  await userToDelete.destroy();

  return userToDelete;
};

UsersModel["restoreUser"] = async (userId) => {
  const userToRestore = await UsersModel.findByPk(userId, { paranoid: false });

  if (!userToRestore) {
    throw new Error("User not found");
  }

  await userToRestore.restore();

  return userToRestore;
};

UsersModel["adminFindAllUsers"] = async () => {
  const allUsers = await UsersModel.findAll({
    paranoid: false, // Incluye los registros marcados como borrados
    include: [
      { model: CountriesModel, attributes: ["name"] },
      { model: ProvincesModel, attributes: ["name"] },
    ],
  });

  return allUsers;
};


module.exports = UsersModel;
