const { ProvincesModel, CountriesModel } = require("../../models/index")
const provincesData = require("../../data/provinces.json")
const insertRecords = require("./insertRecords")

const insertProvinces = async () => {
  
  const arId = await CountriesModel.findIdData("domain", "ar")
  
  const formatedProvinces = provincesData.map((province) => {
    return {
      ...province, countryId: arId
    }
  })
  insertRecords({
    name: 'Provinces',
    model: ProvincesModel,
    data: formatedProvinces,
  })
}

module.exports = insertProvinces