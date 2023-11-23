const { ProvincesModel } = require("../models")
const getProvincesLogic = async (req) => {
  const { country: countryId } = req.query
  if(countryId) return await ProvincesModel.findByCountry(countryId)
  return await ProvincesModel.findAllData();
}

module.exports = { getProvincesLogic }

