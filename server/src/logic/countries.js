const { CountriesModel } = require("../models")

const getCountriesLogic = async () => {
    const countries = await CountriesModel.findAllData();
    return countries
}

module.exports = { getCountriesLogic }

