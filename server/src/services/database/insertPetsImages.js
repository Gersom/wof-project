const { 
  PetsModel, PetsImagesModel
} = require("../../models")

let petsImagesData = require("../../data/pets-images.json")
const insertRecords = require("./insertRecords")

const generateUrl = require("./../../utils/generateUrl")

const insertPets = async () => {
  try {
    const pelucheId = await PetsModel.findIdData("name", "peluche")
    const simbaId = await PetsModel.findIdData("name", "simba")
    const ramsesId = await PetsModel.findIdData("name", "ramses")

    
    petsImagesData = petsImagesData.map((ele) => {
      return { imageUrl: generateUrl(ele.imageUrl)}
    })

    petsImagesData[0].petId = pelucheId
    petsImagesData[1].petId = pelucheId
    petsImagesData[2].petId = pelucheId
    petsImagesData[3].petId = simbaId
    petsImagesData[4].petId = ramsesId

    await insertRecords({
      name: 'PetsImages',
      model: PetsImagesModel,
      data: petsImagesData,
    })
  }
  catch (error) {
    throw Error({error: error.message})
  }
}

module.exports = insertPets