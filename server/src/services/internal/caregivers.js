const { CaregiversModel, UsersModel } = require("../../models")

const getAllCaregiversService = async () => {
  const caregivers = await CaregiversModel.findAll({
    include:{
      model: UsersModel
    }
  })
  return caregivers.map(caregiver => {
    return {
      id: caregiver.id,
            userId: caregiver.userId,
            user: {
                id: caregiver.user.id,
                dni: caregiver.user.dni,
                name: caregiver.user.name,
                lastName: caregiver.user.lastName,
                birthdate: caregiver.user.birthdate,
                email: caregiver.user.email,
                password: caregiver.user.password,
                cellPhone: caregiver.user.cellPhone,
                profilePicture: caregiver.user.profilePicture,
                address: caregiver.user.address,
                role: caregiver.user.role,
                province: caregiver.user.province?.name,
                provinceId: caregiver.user.provinceId,
            }
    }
  })
}

const getCaregiverService = async (id) => {
  const caregiver = await CaregiversModel.findOneData(id)
  if (!caregiver) throw Error("User not found")
  return caregiver
};

const postCaregiverService = async (data) => {
  const { idUser } = data
  const user = await UsersModel.findOneData(idUser)
  if(user.role==1){
      const newCaregiver = await CaregiversModel.create(data);
      await newCaregiver.setUser(user);
      return user
  }
  return 
//   return {
//     success: 'The user was created successfully.'
//   }
}

const updateCaregiverService = async (id, data) => {
  await CaregiversModel.updateData(id, data)
  return {
    success: 'User was update correctly.'
  }
}
const deleteCaregiverService = async (id, data) => {
  await CaregiversModel.removeData(id)
  return {
    success: 'User was deleted correctly.'
  }
}

module.exports = {
  getAllCaregiversService,
  getCaregiverService,
  postCaregiverService,
  updateCaregiverService,
  deleteCaregiverService
};
