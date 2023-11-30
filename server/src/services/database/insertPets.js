const { 
  PetsModel, OwnersModel, UsersModel, SpeciesModel, GerdersModel
} = require("../../models")

let petsData = require("../../data/pets.json")

const insertRecords = require("./insertRecords")

const insertPets = async () => {
  try {
    const dogId = await SpeciesModel.findIdData("name", "dog")
    const catId = await SpeciesModel.findIdData("name", "cat")

    const maleOwnerId = await GerdersModel.findIdData("name", "male")

    const annyUserId = await UsersModel.findIdData("email", "anny@gmail.com")
    const annyOwnerId = await OwnersModel.findIdData("userId", annyUserId)
    
    const gersomUserId = await UsersModel.findIdData("email", "gersom@gmail.com")
    const gersomOwnerId = await OwnersModel.findIdData("userId", gersomUserId)

    const manuelUserId = await UsersModel.findIdData("email", "manuel1234@gmail.com")
    const manuelOwnerId = await OwnersModel.findIdData("userId", manuelUserId)

    const jorgeUserId = await UsersModel.findIdData("email", "jorge1234@gmail.com")
    const jorgeOwnerId = await OwnersModel.findIdData("userId", jorgeUserId)

    const carlosUserId = await UsersModel.findIdData("email", "carlos1234@gmail.com")
    const carlosOwnerId = await OwnersModel.findIdData("userId", carlosUserId)

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
      speciesId: catId,
      breedId: 23,
      genderId: maleOwnerId
    }
    petsData[3] = {
      ...petsData[3],
      ownerId: gersomOwnerId,
      speciesId: dogId,
      breedId: 80,
      genderId: maleOwnerId
    }
    petsData[4] = {
      ...petsData[4],
      ownerId: manuelOwnerId,
      speciesId: dogId,
      breedId: 189,
      genderId: maleOwnerId
    }
    petsData[5] = {
      ...petsData[5],
      ownerId: manuelOwnerId,
      speciesId: dogId,
      breedId: 90,
      genderId: maleOwnerId
    }
    petsData[6] = {
      ...petsData[6],
      ownerId: jorgeOwnerId,
      speciesId: dogId,
      breedId: 160,
      genderId: maleOwnerId
    }
    petsData[7] = {
      ...petsData[7],
      ownerId: jorgeOwnerId,
      speciesId: dogId,
      breedId: 23,
      genderId: maleOwnerId
    }
    petsData[8] = {
      ...petsData[8],
      ownerId: carlosOwnerId,
      speciesId: dogId,
      breedId: 23,
      genderId: maleOwnerId
    }
    petsData[9] = {
      ...petsData[9],
      ownerId: carlosOwnerId,
      speciesId: dogId,
      breedId: 169,
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