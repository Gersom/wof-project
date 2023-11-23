const insertBreeds = require("./insertBreeds")
const insertCaregivers = require("./insertCaregivers")
const insertCountries = require("./insertCountries")
const insertOwners = require("./insertOwners")
const insertPets = require("./insertPets")
const insertPetsImages = require("./insertPetsImages")
const insertPosts = require("./insertPosts")
const insertProvinces = require("./insertProvinces")
const insertReviews = require("./insertReviews")
const insertSpecies = require("./insertSpecies")
const insertUsers = require("./insertUsers")


const insertData = async () => {
  await insertCountries()
  await setTimeout(()=>insertProvinces(), "250")
  await insertSpecies()
  await setTimeout(()=>insertBreeds(), "250")

  await setTimeout(()=>insertUsers(), "500")
  await setTimeout(()=>insertOwners(), "750")
  await setTimeout(()=>insertCaregivers(), "850")

  await setTimeout(()=>insertPets(), "1000")
  await setTimeout(()=>insertPetsImages(), "1250")
  await setTimeout(()=>insertPosts(), "1500")

  await setTimeout(()=>insertReviews(), "2000")
}

module.exports = insertData