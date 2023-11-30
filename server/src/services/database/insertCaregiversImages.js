const { 
    CaregiversModel, CaregiversImagesModel
  } = require("../../models")
  
  let caregiversImagesData = require("../../data/caregivers-images.json")
  const insertRecords = require("./insertRecords")
  
  const generateUrl = require("./../../utils/generateUrl")
  
  const insertCaregivers = async () => {
    try {
      const jhonId = await CaregiversModel.findIdData("id", "1")
      const gabyId = await CaregiversModel.findIdData("id", "2")
      const danielaId = await CaregiversModel.findIdData("id", "3")
      const alonsoId = await CaregiversModel.findIdData("id", "4")
      const sofiaId = await CaregiversModel.findIdData("id", "5")
      const claudiaId = await CaregiversModel.findIdData("id", "6")
      



      
      caregiversImagesData = caregiversImagesData.map((ele) => {
        return { imageUrl: generateUrl(ele.imageUrl)}
      })
  
      caregiversImagesData[0].caregiverId = jhonId
      caregiversImagesData[1].caregiverId = jhonId
      caregiversImagesData[2].caregiverId = gabyId
      caregiversImagesData[3].caregiverId = gabyId
      caregiversImagesData[4].caregiverId = danielaId
      caregiversImagesData[5].caregiverId = danielaId
      caregiversImagesData[6].caregiverId = alonsoId
      caregiversImagesData[7].caregiverId = alonsoId
      caregiversImagesData[8].caregiverId = sofiaId
      caregiversImagesData[9].caregiverId = sofiaId
      caregiversImagesData[10].caregiverId = claudiaId
      caregiversImagesData[11].caregiverId = claudiaId
  
      await insertRecords({
        name: 'CaregiversImages',
        model: CaregiversImagesModel,
        data: caregiversImagesData,
      })
    }
    catch (error) {
      throw Error(error)
    }
  }
  
  module.exports = insertCaregivers