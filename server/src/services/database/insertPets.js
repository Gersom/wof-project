const { 
  PetsModel, OwnersModel, UsersModel, SpeciesModel
} = require("../../models")

let petsData = require("../../data/pets.json")

const insertRecords = require("./insertRecords")

const insertPets = async () => {
  try {
    const annyUserId = await UsersModel.findIdData("email", "anny@gmail.com")
    const annyOwnerId = await OwnersModel.findIdData("userId", annyUserId)
    
    const dogId = await SpeciesModel.findIdData("name", "dog")
    const catId = await SpeciesModel.findIdData("name", "cat")
    
    const gersomUserId = await UsersModel.findIdData("email", "gersom@gmail.com")
    const gersomOwnerId = await OwnersModel.findIdData("userId", gersomUserId)

    petsData[0] = {
      ...petsData[0],
      ownerId: annyOwnerId,
      speciesId: dogId,
      breedId: 63
    }
    petsData[1] = {
      ...petsData[1],
      ownerId: annyOwnerId,
      speciesId: catId,
      breedId: 190
    }
    petsData[2] = {
      ...petsData[2],
      ownerId: gersomOwnerId,
      speciesId: dogId,
      breedId: 23
    }

    await insertRecords({
      name: 'Pets',
      model: PetsModel,
      data: petsData,
    })
  }
  catch (error) {
    throw Error({error: error.message})
  }
}

module.exports = insertPets