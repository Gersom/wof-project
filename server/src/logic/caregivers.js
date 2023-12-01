const { CaregiversModel, UsersModel, CaregiversImagesModel } = require("../models")

const getAllCaregiversLogic = async () => {
  const caregivers = await CaregiversModel.findAllCaregivers()
  return caregivers.map(caregiver => {
    return {
      id: caregiver.id,
      userId: caregiver?.userId,
      user: {
          id: caregiver?.user?.id,
          dni: caregiver?.user?.dni,
          name: caregiver?.user?.name,
          lastName: caregiver?.user?.lastName,
          birthdate: caregiver?.user?.birthdate,
          email: caregiver?.user?.email,
          password: caregiver?.user?.password,
          cellPhone: caregiver?.user?.cellPhone,
          profilePicture: caregiver?.user?.profilePicture,
          address: caregiver?.user?.address,
          role: caregiver?.user?.role,
          province: caregiver?.user?.province?.name,
          provinceId: caregiver?.user?.provinceId,
      }
    }
  })
}

const getCaregiverLogic = async (id) => {
  const caregiver = await CaregiversModel.findCaregiver(id)
  if (!caregiver) throw Error("User not found")
  return caregiver
};

const postCaregiverLogic = async (data) => {
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

const updateCaregiverLogic = async (id, data) => {
  const { images } = data
  if(images){
    await CaregiversImagesModel.removeDataByCaregiver(id)
    const imgs = images.map(img => {
      return {
        imageUrl:img,
        caregiverId:id
      }
    })
    CaregiversImagesModel.createMany(imgs)
  }
  await CaregiversModel.updateData(id, data)
  return {
    success: 'User was update correctly.'
  }
}
const deleteCaregiverLogic = async (id, data) => {
  await CaregiversModel.removeData(id)
  return {
    success: 'User was deleted correctly.'
  }
}

module.exports = {
  getAllCaregiversLogic,
  getCaregiverLogic,
  postCaregiverLogic,
  updateCaregiverLogic,
  deleteCaregiverLogic
};
