const { usersModel } = require("../../models")

const getAllUsersService = async () => {
  const User = await usersModel.findAllData()
  return User
}

const getUserService = async (id) => {
  const User = await usersModel.findOneData(id)
  if(!User) throw Error("User not found")
  return User
};

const postUserService = async (data) => {
  const newUser = await usersModel.create(data)
  return newUser
  // return {
  //   success: 'The user was created successfully.'
  // }
}

const updateUserService = async (id, data) => {
  await usersModel.updateData(id, data)
  return {
    success: 'User was update correctly.'
  }
}
const deleteUserService = async (id, data) => {
  await usersModel.removeData(id)
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
