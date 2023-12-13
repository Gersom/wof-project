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
const insertGenders = require("./insertGenders")
const insertRequests = require("./insertRequests")
const insertCaregiversImages = require("./insertCaregiversImages")

const insertData = async () => {
  await insertCountries()
  await insertGenders()
  await insertSpecies()

  await setTimeout(()=>insertProvinces(), "500")
  await setTimeout(()=>insertBreeds(), "1000")

  await setTimeout(()=>insertUsers(), "1500")
  await setTimeout(()=>insertOwners(), "2500")
  await setTimeout(()=>insertCaregivers(), "3000")
  await setTimeout(()=>insertCaregiversImages(), "4000")

  await setTimeout(()=>insertPets(), "3000")
  await setTimeout(()=>insertPosts(), "4000")
  await setTimeout(()=>insertReviews(), "4500")
  await setTimeout(()=>insertPetsImages(), "5000")
  await setTimeout(()=>insertRequests(), "5500")
}

module.exports = insertData