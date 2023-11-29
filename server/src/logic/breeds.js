const { BreedsModel } = require("../models")

const getBreedsLogic = async (req) => {
    const { speciesId } = req.query
    if(!speciesId) throw Error("missing speciesId")
    const breeds = await BreedsModel.findAllBySpecies(speciesId);
    return breeds
}

module.exports = { getBreedsLogic }

