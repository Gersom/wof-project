const { getCountriesErrorHandler } = require("../handlers/countries");
const { getCountriesLogic } = require("../logic/countries");
const catchedAsync = require("../utils/catchedAsync");

const getCountries = catchedAsync(async(req, res) => {
    const countries = await getCountriesLogic(req);
    res.status(200).json(countries)
}, getCountriesErrorHandler)

module.exports = { getCountries };