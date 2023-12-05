const { ReviewsModel, UsersModel, NotificationsModel } = require("../models");
const { createdReview, updatedReview } = require("../data/notifications");

const getAllReviewsLogic = async (ownerid) => {
  const reviews = await ReviewsModel.findAllData();
  if (ownerid) {
    return await ReviewsModel.findByOwner(ownerid);
  }
  return reviews;
};

const getReviewLogic = async (id) => {
  const review = await ReviewsModel.findDataById(id);
  if (!review) throw Error("User not found");
  return review;
};

const postReviewLogic = async (data) => {
  const { rating, from, to, caregiverId, ownerId } = data;
  if (!rating || !from || !to || !caregiverId || !ownerId)
    throw Error("./missing data");
  if (from === to) throw Error(`'from' and 'to' cannot be equal`);

  const newReview = await ReviewsModel.createReview(data);
  await NotificationsModel.create({
    ...createdReview,
    ownerId: data.ownerId,
    caregiverId: data.caregiverId,
  });

  return newReview;
};
//   return {
//     success: 'The user was created successfully.'
//   }

const updateReviewLogic = async (id, data) => {
  const { comment, rating } = data;

  await ReviewsModel.updateData(id, { comment, rating });
  await NotificationsModel.create({
    ...updatedReview,
  });
  console.log(pruebaNoti);

  return {
    success: "User was update correctly.",
  };
};
const deleteReviewLogic = async (id, data) => {
  await ReviewsModel.removeData(id);
  return {
    success: "User was deleted correctly.",
  };
};

module.exports = {
  getAllReviewsLogic,
  getReviewLogic,
  postReviewLogic,
  updateReviewLogic,
  deleteReviewLogic,
};
