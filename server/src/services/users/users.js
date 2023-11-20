const { usersModel } = require("../../models")

const getAllUsersController = async () => {
  const User = await usersModel.findAllData()
  return User
}

const getUserController = async (id) => {
  const User = await usersModel.findOneData(id)
  if(!User) throw Error("User not found")
  return User
};

const postUserController = async (data) => {
  const newUser = await usersModel.create(data)
  return newUser
  // return {
  //   success: 'The user was created successfully.'
  // }
}

const updateUserController = async (id, data) => {
  await usersModel.updateData(id, data)
  return {
    success: 'User was update correctly.'
  }
}
const deleteUserController = async (id, data) => {
  await usersModel.removeData(id)
  return {
    success: 'User was deleted correctly.'
  }
}

module.exports = {
  getAllUsersController,
  getUserController,
  postUserController,
  updateUserController,
  deleteUserController
};
