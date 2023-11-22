const insertCountries = require("./insertCountries")
const insertSpecies = require("./insertSpecies")
const insertBreeds = require("./insertBreeds")
const insertUsers = require("./insertUsers")
const insertOwners = require("./insertOwners")
const insertPets = require("./insertPets")
const insertPetsImages = require("./insertPetsImages")
const insertPosts = require("./insertPosts")
const insertProvinces = require("./insertProvinces")


const insertData = async () => {
  await insertProvinces()
  await insertSpecies()
  await setTimeout(()=>insertBreeds(), "250")
  await insertCountries()
  await setTimeout(()=>insertUsers(), "500")
  await setTimeout(()=>insertOwners(), "750")
  await setTimeout(()=>insertPets(), "1000")
  await setTimeout(()=>insertPetsImages(), "1250")
  await setTimeout(()=>insertPosts(), "1500")
}

module.exports = insertData