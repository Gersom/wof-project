const { getSpeciesErrorHandler } = require("../handlers/species");
const { getSpeciesLogic } = require("../logic/species");
const catchedAsync = require("../utils/catchedAsync");

const getSpecies = catchedAsync(async(req, res) => {
    const species = await getSpeciesLogic(req);
    res.status(200).json(species)
}, getSpeciesErrorHandler)

module.exports = { getSpecies };