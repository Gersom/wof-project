const { 
  PetsModel, OwnersModel, UsersModel, SpeciesModel, GerdersModel
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

    const maleOwnerId = await GerdersModel.findIdData("name", "male")
    // const femaleOwnerId = await GerdersModel.findIdData("name", "female")

    petsData[0] = {
      ...petsData[0],
      ownerId: annyOwnerId,
      speciesId: dogId,
      breedId: 63,
      genderId: maleOwnerId
    }
    petsData[1] = {
      ...petsData[1],
      ownerId: annyOwnerId,
      speciesId: catId,
      breedId: 190,
      genderId: maleOwnerId
    }
    petsData[2] = {
      ...petsData[2],
      ownerId: gersomOwnerId,
      speciesId: dogId,
      breedId: 23,
      genderId: maleOwnerId
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