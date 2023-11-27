const { UsersModel, CountriesModel, ProvincesModel } = require("../../models/index")
const usersData = require("../../data/users.json")
const insertRecords = require("./insertRecords")

const generateUrl = require("../../utils/generateUrl")

const insertUsers = async () => {
  try {
    const countryArId = await CountriesModel.findIdData("domain", "ar")
    const mendozaId = await ProvincesModel.findIdData("name", "mendoza")

    const usersFormated = usersData.map((ele) => {
      return {
        ...ele,
        profilePicture: generateUrl(ele.profilePicture),
        countryId: countryArId ? countryArId : '',
        provinceId: mendozaId ? mendozaId : ''
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

module.exports = insertUsers