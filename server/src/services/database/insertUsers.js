const { UsersModel, CountriesModel } = require("../../models/index")
const usersData = require("../../data/users.json")
const insertRecords = require("./insertRecords")

const generateServerPath = require("./../../utils/generateServerPath")
const { path: serverPath } = generateServerPath()

const insertCountries = async () => {
  try {
    const countryArId = await CountriesModel.findIdData("domain", "ar")

    const usersFormated = usersData.map((ele) => {
      return {
        ...ele,
        profilePicture: serverPath + ele.profilePicture,
        countryId: countryArId ? countryArId : ''
      }
    })

    insertRecords({
      name: 'Users',
      model: UsersModel,
      data: usersFormated,
    })
  } catch (error) {
    throw Error(error.message)
  }
}

module.exports = insertCountries