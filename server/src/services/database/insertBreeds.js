const { BreedsModel } = require("../../models")
const { SpeciesModel } = require("../../models")

const breddsDogs = require("../../data/breeds/dogs-es.json")
const breddsCats = require("../../data/breeds/cats-es.json")

const insertRecords = require("./insertRecords")

const mixedData = {
  es: "Mestizo",
  en: "Mixed breed"
}

const insertBreeds = async () => {
  try {
    const dogId = await SpeciesModel.findIdData("name", "dog")
    const catId = await SpeciesModel.findIdData("name", "cat")

    let breedsData = []

    if (dogId) {
      const dogsData = breddsDogs.map((ele) => {
        return { name: ele.name, speciesId: dogId }
      })
      breedsData = [
        ...breedsData, 
        { name: mixedData.es, speciesId: dogId },
        ...dogsData
      ]
    }

    if (catId) {
      const catsData = breddsCats.map((ele) => {
        return { name: ele.name, speciesId: catId }
      })
      breedsData = [
        ...breedsData, 
        { name: mixedData.es, speciesId: catId },
        ...catsData
      ]
    }

    if (breedsData.length > 0) {
      await insertRecords({
        name: 'Breeds',
        model: BreedsModel,
        data: breedsData,
      })
    }
  }
  catch (error) {
    throw Error({error: error.message})
  }
}

module.exports = insertBreeds