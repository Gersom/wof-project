const { UsersModel, ProvincesModel } = require("../../models")

const getAllUsersService = async () => {
  const User = await UsersModel.findAllData()
  return User
}

const getUserService = async (id) => {
  const User = await UsersModel.findOneData(id)
  if (!User) throw Error("User not found")
  return User
};

const postUserService = async (data) => {
  const { province } = data
  const newUser = await UsersModel.create(data)
  const provinceDB = await ProvincesModel.findOne({
    where: {
      name: province
    }
  })
  await newUser.setProvince(provinceDB)
 
  return {
    success: 'The user was created successfully.'
  }
}

const updateUserService = async (id, data) => {
  await UsersModel.updateData(id, data)
  return {
    success: 'User was update correctly.'
  }
}
const deleteUserService = async (id, data) => {
  await UsersModel.removeData(id)
  return {
    success: 'User was deleted correctly.'
  }
}

module.exports = {
  getAllUsersService,
  getUserService,
  postUserService,
  updateUserService,
  deleteUserService
};
