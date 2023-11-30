const { UsersModel, CaregiversModel } = require("../../models/index")
const insertRecords = require("./insertRecords")

let carevigersData = require("../../data/caregivers.json")

const insertOwners = async () => {
  try {
    const jhonId = await UsersModel.findIdData("email", "jhonatan@gmail.com")
    const gabyId = await UsersModel.findIdData("email", "gaby@gmail.com")
    const danielaId = await UsersModel.findIdData("email", "abcde@gmail.com")
    const alonsoId = await UsersModel.findIdData("email", "alonso1234@gmail.com")
    const sofiaId = await UsersModel.findIdData("email", "sofia1234@gmail.com")
    const claudiaId = await UsersModel.findIdData("email", "claudia1234@gmail.com")

    carevigersData[0] = {
      ...carevigersData[0],
      userId: jhonId
    }
    carevigersData[1] = {
      ...carevigersData[1],
      userId: gabyId
    }
    carevigersData[2] = {
      ...carevigersData[2],
      userId: danielaId
    }
    carevigersData[3] = {
      ...carevigersData[3],
      userId: alonsoId
    }
    carevigersData[4] = {
      ...carevigersData[4],
      userId: sofiaId
    }
    carevigersData[5] = {
      ...carevigersData[5],
      userId: claudiaId
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