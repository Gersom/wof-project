const ErrorHandler = require("../handlers/reviews")
const {
  getAllReviewsLogic,
  getReviewLogic,
  postReviewLogic,
  updateReviewLogic,
  deleteReviewLogic
} = require("../logic/reviews")
const catchedAsync = require("../utils/catchedAsync")

// READ ITEMS
const getAllReviews =catchedAsync( async (req, res) => {
    const { ownerid } = req.query
    const reviews = await getAllReviewsLogic(ownerid)
    res.status(200).json(reviews)
}, ErrorHandler.getAllReviewsErrorHandler)

// DETAIL ITEM
const getReview =catchedAsync( async (req, res) => {
    const {id} = req.params
    const review = await getReviewLogic(id)
    res.status(200).json(review);
},ErrorHandler.getReviewErrorHandler)

// CREATE ITEM
const createReview =catchedAsync( async (req, res) => {
  
    const newReview = await postReviewLogic(req.body)
    res.status(200).json(newReview);
  
},ErrorHandler.createCaregiverErrorHandler);

// UPDATE ITEM
const updateReview =catchedAsync( async (req, res) => {
    const { id } = req.params
    const { body } = req
    const updatedReview = await updateReviewLogic(id, body)
    res.status(200).json(updatedReview)

},ErrorHandler.updateCaregiverErrorHandler);

// DELETE ITEM
const deleteReview =catchedAsync(async (req, res) => {
    const { id } = req.params
    const deletedReview = await deleteReviewLogic(id)
    res.status(200).json(deletedReview)
}, ErrorHandler.deleteReviewErrorHandler);

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
};
