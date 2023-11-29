const { PetsModel } = require("../models")

const getAllPetsLogic = async (ownerId) => {
  const pets = await PetsModel.findAllPets(ownerId)
  return pets.map(pet => {
    let petImgUrl = ""

    if (pet?.petsImages?.length > 0) {
      petImgUrl = pet?.petsImages[0]?.imageUrl
    }
    return {
      id: pet.post.id,
      address: pet.post?.address,
      startDate: pet.post?.startDate,
      endDate: pet.post?.endDate,
      pet: {
        id: pet.id,
        name: pet.name,
        temperaments: pet.temperaments,
        manners: pet.manners,
        notes: pet.notes,

        imageUrl:petImgUrl,
        species: pet.species,
        breed: pet.breed,
        gender: pet.gender,

      },
      owner: {
        id: pet.owner.id,
        userId: pet.owner.userId,
        name: pet.owner.user.name
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
    return newPet
    //   return {
    //     success: 'The user was created successfully.'
    //   }
}

const updatePetLogic = async (id, data) => {
    await PetsModel.updateData(id, data)
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
