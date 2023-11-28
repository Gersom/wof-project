const { PetsModel } = require("../models")

const getAllPetsLogic = async () => {
    const pets = await PetsModel.findAllPets()
    return pets
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
