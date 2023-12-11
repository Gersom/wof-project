const { UsersModel, RequestsModel, CaregiversModel } = require("../../models/index")
const insertRecords = require("./insertRecords")

const requestsData = require("../../data/request.json")


const insertRequests = async () => {
  try {
    const jhonId = await UsersModel.findIdData("email", "jhonatan@gmail.com")
    const gabyId = await UsersModel.findIdData("email", "gaby@gmail.com")

    const jhonCaregiverId = await CaregiversModel.findIdData("userId", jhonId)
    const gabyCaregiverId = await CaregiversModel.findIdData("userId", gabyId)

    let requestsFormated = requestsData
    requestsFormated[0] = {
      ...requestsFormated[0],
      caregiverId: jhonCaregiverId,
      servicePostingId: 1 
    }
    requestsFormated[1] = {
      ...requestsFormated[1],
      caregiverId: gabyCaregiverId,
      servicePostingId: 1 
    }

    insertRecords({
      name: 'Requests',
      model: RequestsModel,
      data: requestsFormated
    })
  } catch (error) {
    throw Error(error.message)
  }
}

module.exports = insertRequests