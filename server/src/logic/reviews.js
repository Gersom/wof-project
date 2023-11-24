const { ReviewsModel, UsersModel } = require("../models");

const getAllReviewsLogic = async (ownerid) => {
  const reviews = await ReviewsModel.findAllData()
  if(ownerid){
    return await ReviewsModel.findByOwner(ownerid)
  }
  return reviews
}

const getReviewLogic = async (id) => {
  const review = await ReviewsModel.findDataById(id)
  if (!review) throw Error("User not found")
  return review
};

const postReviewLogic = async (data) => {
  const newReview = await ReviewsModel.createReview(data)
  return newReview
  }
//   return {
//     success: 'The user was created successfully.'
//   }

const updateReviewLogic = async (id, data) => {
  await ReviewsModel.updateData(id, data)
  return {
    success: 'User was update correctly.'
  }
}
const deleteReviewLogic = async (id, data) => {
  await ReviewsModel.removeData(id)
  return {
    success: 'User was deleted correctly.'
  }
}

module.exports = {
  getAllReviewsLogic,
  getReviewLogic,
  postReviewLogic,
  updateReviewLogic,
  deleteReviewLogic
};