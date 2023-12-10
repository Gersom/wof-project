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

const getCaredPetsLogic = async (id) => {
  const CaredPets = await CaregiversModel.findCaredPets(id);
  const CaredPetsMap = CaredPets.map(c => {
    return {
        ...c.toJSON(),
        pet: {
            name      : c.pet?.name,
            species   : c.pet?.species?.icon,
            breed     : c.pet?.breed?.name
        },
        owner: {
            name            : c.owner?.user?.name,
            profilePicture  : c.owner?.user?.profilePicture,
            rating          : c.owner?.rating
        }
    }
})

return CaredPetsMap
}

const getWalletLogic = async (id) => {
  const wallet = CaregiversModel.findWallet(id)
  if (!wallet) throw Error("User not found")
  return wallet
}

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
  getCaredPetsLogic,
  getWalletLogic,
  postCaregiverLogic,
  updateCaregiverLogic,
  deleteCaregiverLogic
};
