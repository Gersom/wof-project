const { PetsModel } = require("../models")
const { PetsImagesModel } = require("../models")

const getAllPetsLogic = async (ownerId) => {
  const pets = await PetsModel.findAllPets(ownerId)
  return pets.map(pet => {
    let petImgUrl = ""

    const postObj = pet?.post?.toJSON()

    if (pet?.petsImages?.length > 0) {
      petImgUrl = pet?.petsImages[0]?.imageUrl
    }
    return {
      id: pet?.post?.id,
      status: pet?.post?.status,
      address: pet?.post?.address,
      startDate: pet?.post?.startDate,
      endDate: pet?.post?.endDate,
      pet: {
        id: pet?.id,
        name: pet?.name,
        temperaments: pet?.temperaments,
        manners: pet?.manners,
        notes: pet?.notes,

        imageUrl:petImgUrl,
        species: pet?.species,
        breed: pet?.breed,
        gender: pet?.gender,

      },
      owner: {
        id: pet?.owner?.id,
        userId: pet?.owner?.userId,
        name: pet?.owner?.user?.name
      },
      caregiver: {
        id: postObj?.caregiver?.id,
        experiencies: postObj?.caregiver?.experiencies,
        myHouse: postObj?.caregiver?.myHouse,
        notes: postObj?.caregiver?.notes,

        userId: postObj?.caregiver?.user?.id,
        name: postObj?.caregiver?.user?.name,
        lastName: postObj?.caregiver?.user?.lastName,
        profilePicture: postObj?.caregiver?.user?.profilePicture,
        address: postObj?.caregiver?.user?.address,
      }
    }
  })
}

const getPetLogic = async (id) => {
    const pet = await PetsModel.findPet(id)
    if (!pet) throw Error("Pet not found")
    return pet
};

const postPetLogic = async (data) => {
    const newPet = await PetsModel.createPet(data)
    const images = data.imageUrl
    if (images) {
      const imagesFormated = images.map((img) => ({
        petId: newPet.id, imageUrl: img
      }))
      await PetsImagesModel.createMany(imagesFormated)
    }

    return newPet
    //   return {
    //     success: 'The user was created successfully.'
    //   }
}

const updatePetLogic = async (petId, data) => {
  await PetsImagesModel.removeDataByPet(petId)
  await PetsModel.updateData(petId, data)
  const images = data.imageUrl
  if (images) {
    const imagesFormated = images.map((img) => ({
      petId, imageUrl: img
    }))
    await PetsImagesModel.createMany(imagesFormated)
  }
  return {
      success: 'Pet was update correctly.'
  }
}
const deletePetLogic = async (id) => {
    await PetsModel.removeData(id)
    return {
        success: 'Pet was deleted correctly.'
    }
}

module.exports = {
    getAllPetsLogic,
    getPetLogic,
    postPetLogic,
    updatePetLogic,
    deletePetLogic
};
