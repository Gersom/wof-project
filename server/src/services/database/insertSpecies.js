const { SpeciesModel } = require("./../../models/index")
const speciesData = require("./data/species.json")
const insertRecords = require("./insertRecords")

const insertSpecies = async () => {
  insertRecords({
    name: 'Species',
    model: SpeciesModel,
    data: speciesData,
  })
}

module.exports = insertSpecies