const { ReviewsModel, UsersModel, NotificationsModel } = require("../models");
const { createdReview } = require("../data/notifications");

const getAllReviewsLogic = async () => {
  const reviews = await ReviewsModel.findAllData();
  return reviews;
};

const getReviewsByOwnerLogic = async (ownerId) => {
  if(!ownerId) throw Error("missing ownerId") 
  const reviews = await ReviewsModel.findByOwner(ownerId)
  if(reviews.length > 3) return reviews.slice(0,3);
  return reviews
}
const getReviewsByCaregiverLogic = async (caregiverId) => {
  if(!caregiverId) throw Error("missing caregiverId")
  const reviews = await ReviewsModel.findByCaregiver(caregiverId)
  if(reviews.length > 3) return reviews.slice(0,3);
  return reviews
}

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
    userId: data.userId,
  });

  return newReview;
};
//   return {
//     success: 'The user was created successfully.'
//   }

const updateReviewLogic = async (id, data) => {
  const { comment, rating } = data;

  await ReviewsModel.updateData(id, { comment, rating });

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
  getReviewsByOwnerLogic,
  getReviewsByCaregiverLogic,
  getReviewLogic,
  postReviewLogic,
  updateReviewLogic,
  deleteReviewLogic,
};
