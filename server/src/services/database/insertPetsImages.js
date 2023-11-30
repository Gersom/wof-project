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
    const peluchinId = await PetsModel.findIdData("name", "peluchin")
    const princesaId = await PetsModel.findIdData("name", "princesa")
    const ramboId = await PetsModel.findIdData("name", "rambo")
    const zoroId = await PetsModel.findIdData("name", "zoro")
    const zimbaId = await PetsModel.findIdData("name", "zimba")
    const principeId = await PetsModel.findIdData("name", "principe")
    const nachoId = await PetsModel.findIdData("name", "nacho")
 
    petsImagesData = petsImagesData.map((ele) => {
      return { imageUrl: generateUrl(ele.imageUrl)}
    })

    petsImagesData[0].petId = pelucheId
    petsImagesData[1].petId = pelucheId
    petsImagesData[2].petId = pelucheId
    petsImagesData[3].petId = simbaId
    petsImagesData[4].petId = ramsesId
    petsImagesData[5].petId = peluchinId
    petsImagesData[6].petId = peluchinId
    petsImagesData[7].petId = princesaId
    petsImagesData[8].petId = princesaId
    petsImagesData[9].petId = ramboId
    petsImagesData[10].petId = ramboId
    petsImagesData[11].petId = zoroId
    petsImagesData[12].petId = zoroId
    petsImagesData[13].petId = zimbaId
    petsImagesData[14].petId = zimbaId
    petsImagesData[15].petId = principeId
    petsImagesData[16].petId = principeId
    petsImagesData[17].petId = nachoId
    petsImagesData[18].petId = nachoId

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