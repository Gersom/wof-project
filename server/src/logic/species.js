const { SpeciesModel } = require("../models")

const getSpeciesLogic = async () => {
    const species = await SpeciesModel.findAllData();
    return species
}

module.exports = { getSpeciesLogic }

