const { UsersModel, ProvincesModel } = require("../models")

const getAllUsersLogic = async () => {
  const User = await UsersModel.findAll({
    include:{
      model: ProvincesModel
    }
  })
  return User.map(user => {
    return {
      id : user.id,
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
      province: user.province.name,
      provinceId: user.provinceId,
    }
  })
}

const getUserLogic = async (id) => {
  const User = await UsersModel.findOneData(id)
  if (!User) throw Error("User not found")
  return User
};

const postUserLogic = async (data) => {
  const { province, role } = data
  const newUser = await UsersModel.create(data)
  const provinceDB = await ProvincesModel.findOne({
    where: {
      name: province
    }
  })
  await newUser.setProvince(provinceDB)
  if(role==="caregiver"){
    newUser.createCaregiver({
      userId:newUser.id
    })
  }
  if(role==="owner"){
    newUser.createOwner({
      userId:newUser.id
    })
  }
  return newUser
  // return {
  //   success: 'The user was created successfully.'
  // }
}

const updateUserLogic = async (id, data) => {
  await UsersModel.updateData(id, data)
  return {
    success: 'User was update correctly.'
  }
}
const deleteUserLogic = async (id, data) => {
  await UsersModel.removeData(id)
  return {
    success: 'User was deleted correctly.'
  }
}

module.exports = {
  getAllUsersLogic,
  getUserLogic,
  postUserLogic,
  updateUserLogic,
  deleteUserLogic
};
