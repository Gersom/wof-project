const { CountriesModel } = require("../../models/index")
const countriesData = require("../../database/data/countries.json")
const insertRecords = require("./insertRecords")

const insertCountries = async () => {
  insertRecords({
    name: 'Countries',
    model: CountriesModel,
    data: countriesData,
  })
}

module.exports = insertCountries