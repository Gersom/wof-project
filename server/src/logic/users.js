const { UsersModel, ProvincesModel, CountriesModel } = require("../models");
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
  const User = await UsersModel.findDataById(id);
  if (!User) throw Error("User not found");
  return User;
};

const postUserLogic = async (data) => {
  const { province, role, country } = data;
  const saltRounds = 10;
  data.password = await bcrypt.hash(data.password, saltRounds);

  const newUser = await UsersModel.create(data);
  
  if (country) {
    const countryDB = await CountriesModel.findOne({
      where: {
        name: country,
      },
    });
    await newUser.setCountry(countryDB);
  }
  if (province) {
    const provinceDB = await ProvincesModel.findOne({
      where: {
        name: province,
      },
    });
    await newUser.setProvince(provinceDB);
  }
  
  if (role === "caregiver") {
    newUser.createCaregiver({
      userId: newUser.id,
    });
  }
  if (role === "owner") {
    newUser.createOwner({
      userId: newUser.id,
    });
  }
  return newUser;
  // return {
  //   success: 'The user was created successfully.'
  // }
};

const updateUserLogic = async (id, data) => {
  await UsersModel.updateData(id, data);
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

module.exports = {
  getAllUsersLogic,
  getUserLogic,
  postUserLogic,
  updateUserLogic,
  deleteUserLogic,
};
