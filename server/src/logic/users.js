const { 
  UsersModel, ProvincesModel, CountriesModel, CaregiversModel, OwnersModel
} = require("../models");
const bcrypt = require("bcrypt");

const getAllUsersLogic = async () => {
  const User = await UsersModel.findAllUsers();
  return User.map((user) => {
    return {
      id: user.id,
      dni: user.dni,
      name: user.name,
      lastName: user.lastName,
      birthdate: user.birthdate,
      email: user.email,
      password: user.password,
      cellPhone: user.cellPhone,
      profilePicture: user.profilePicture,
      address: user.address,
      role: user.role,
      countryId: user.countryId,
      provinceId: user.provinceId,
      country: user.country?.name,
      province: user.province?.name,
    };
  });
};

const getUserLogic = async (id) => {
  const User = await UsersModel.findUserById(id);
  if (!User) throw Error("User not found");
  return User;
};

const postUserLogic = async (data) => {
  const originalPassword = data.password
  const originalEmail = data.email
  const originalName = data.name
  let messages = ['The user was created successfully.']

  if (originalPassword && originalEmail && originalName) {
    // Password hash
    let { password, ...newData } = data
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    newData.password = hashPassword

    // Country AR
    const arId = await CountriesModel.findIdData("domain", "ar")
    newData.countryId = arId
    messages.push("Country Id Add successfully")
    
    newData.provinceId = Number(newData.provinceId)
    if(typeof newData.provinceId === "number") {
      messages.push("Province Id Add successfully")
    }
    
    const newUser = await UsersModel.createUser(newData);

    // Roles
    const role = data.role;
    if (role === "caregiver") {
      await CaregiversModel.create({userId: newUser.id})
      messages.push("New Caregiver created successfully")
    }
    if (role === "owner") {
      await OwnersModel.create({userId: newUser.id})
      messages.push("New Owner created successfully")
    }

    // return newUser;
    return { 
      success: messages,
      email: newUser.email,
      name: newUser.name,
      lastName: newUser.lastName
    }
  }
  else throw Error("Data missing")
};

const updateUserLogic = async (id, data) => {
  // if(data.password) throw Error("cannot change password")
  // if(data.email) throw Error("cannot change email")
  const { email, password, ...newData } = data;
  await UsersModel.updateData(id, newData);
  return {
    success: "User was update correctly.",
  };
};
const deleteUserLogic = async (id, data) => {
  await UsersModel.removeData(id);
  return {
    success: "User was deleted correctly.",
  };
};

const postNewRoleLogic = async (userId, body) => {
  const role = body.role
  const User = await UsersModel.updateData(userId, {role});

  if (role === "caregiver") {
    const exist = await CaregiversModel.dataExistByUser(userId)
    if (!exist) {
      const responseCreate = await CaregiversModel.create({userId});
      return {caregiverId: responseCreate?.id};
    }
    return User
  } else if (role === "owner") {
    const exist = await OwnersModel.dataExistByUser(userId)
    if (!exist) {
      const responseCreate = await OwnersModel.create({userId});
      return {caregiverId: responseCreate?.id};
    }
    return User
  }
};

module.exports = {
  getAllUsersLogic,
  getUserLogic,
  postUserLogic,
  updateUserLogic,
  deleteUserLogic,
  postNewRoleLogic,
};
