const { UsersModel, OwnersModel } = require("../../models/index")
const insertRecords = require("./insertRecords")

const insertOwners = async () => {
  try {
    const annyId = await UsersModel.findIdData("email", "anny@gmail.com")
    const gersomId = await UsersModel.findIdData("email", "gersom@gmail.com")
    const manuelId = await UsersModel.findIdData("email", "manuel1234@gmail.com")
    const jorgeId = await UsersModel.findIdData("email", "jorge1234@gmail.com")
    const carlosId = await UsersModel.findIdData("email", "carlos1234@gmail.com")

    const OwnersData = [
      { userId: annyId ? annyId : '' },
      { userId: gersomId ? gersomId : '' },
      { userId: manuelId ? manuelId : '' },
      { userId: jorgeId ? jorgeId : '' },
      { userId: carlosId ? carlosId : '' },
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

module.exports = insertOwners