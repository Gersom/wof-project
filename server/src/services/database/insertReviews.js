const { UsersModel, CaregiversModel, OwnersModel, ReviewsModel } = require("../../models/index")
const insertRecords = require("./insertRecords")

let reviewsData = require("../../data/reviews.json")

const insertOwners = async () => {
  try {
    const jhonId = await UsersModel.findIdData("email", "jhonatan@gmail.com")
    const gabyId = await UsersModel.findIdData("email", "gaby@gmail.com")
    const annyId = await UsersModel.findIdData("email", "anny@gmail.com")

    const jhonCarevigerId = await CaregiversModel.findIdData("userId", jhonId)
    const gabyCarevigerId = await CaregiversModel.findIdData("userId", gabyId)
    const annyOwnerId = await OwnersModel.findIdData("userId", annyId)

    reviewsData[0] = {
      ...reviewsData[0],
      caregiverId: jhonCarevigerId,
      ownerId: annyOwnerId
    }
    reviewsData[1] = {
      ...reviewsData[1],
      caregiverId: gabyCarevigerId,
      ownerId: annyOwnerId
    }

    insertRecords({
      name: 'Reviews',
      model: ReviewsModel,
      data: reviewsData
    })
  } catch (error) {
    throw Error(error.message)
  }
}

module.exports = insertOwners