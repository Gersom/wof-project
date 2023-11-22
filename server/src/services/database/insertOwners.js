const { UsersModel, OwnersModel } = require("../../models/index")
const insertRecords = require("./insertRecords")

const insertCountries = async () => {
  try {
    const annyId = await UsersModel.findIdData("email", "anny@gmail.com")
    const gersomId = await UsersModel.findIdData("email", "gersom@gmail.com")

    const OwnersData = [
      { userId: annyId ? annyId : '' },
      { userId: gersomId ? gersomId : '' }
    ]

    insertRecords({
      name: 'Owners',
      model: OwnersModel,
      data: OwnersData
    })
  } catch (error) {
    throw Error(error.message)
  }
}

module.exports = insertCountries