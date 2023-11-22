const insertCountries = require("./insertCountries")
const insertSpecies = require("./insertSpecies")
const insertBreeds = require("./insertBreeds")
const insertUsers = require("./insertUsers")
const insertOwners = require("./insertOwners")

const insertData = async () => {
  await insertSpecies()
  await setTimeout(()=>insertBreeds(), "700")
  await insertCountries()
  await setTimeout(()=>insertUsers(), "700")
  await setTimeout(()=>insertOwners(), "1400")
}

module.exports = insertData