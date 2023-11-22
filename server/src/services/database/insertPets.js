const { 
  BreedsModel, PetsModel, OwnersModel, UsersModel
} = require("../../models")

// const breddsDogs = require("../../data/breeds/dogs-es.json")
// const breddsCats = require("../../data/breeds/cats-es.json")

const insertRecords = require("./insertRecords")

const insertPets = async () => {
  try {
    const OwnerId = await SpeciesModel.findIdData("name", "dog")
    const catId = await SpeciesModel.findIdData("name", "cat")

    
    // const dogsData = breddsDogs.map((ele) => {
    //   return { name: ele.name, speciesId: dogId }
    // })

    // await insertRecords({
      //   name: 'Breeds',
    //   model: BreedsModel,
    //   data: breedsData,
    // })
  }
  catch (error) {
    throw Error({error: error.message})
  }
}

module.exports = insertPets