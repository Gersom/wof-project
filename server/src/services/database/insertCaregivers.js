const { UsersModel, CaregiversModel } = require("../../models/index")
const insertRecords = require("./insertRecords")

let carevigersData = require("../../data/caregivers.json")

const insertOwners = async () => {
  try {
    const jhonId = await UsersModel.findIdData("email", "jhonatan@gmail.com")
    const gabyId = await UsersModel.findIdData("email", "gaby@gmail.com")

    carevigersData[0] = {
      ...carevigersData[0],
      userId: jhonId
    }
    carevigersData[1] = {
      ...carevigersData[1],
      userId: gabyId
    }

    insertRecords({
      name: 'Caregivers',
      model: CaregiversModel,
      data: carevigersData
    })
  } catch (error) {
    throw Error(error.message)
  }
}

module.exports = insertOwners