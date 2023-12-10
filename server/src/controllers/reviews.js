const ErrorHandler = require("../handlers/reviews")
const {
  getAllReviewsLogic,
  getReviewLogic,
  getReviewsByOwnerLogic,
  getReviewsByCaregiverLogic,
  postReviewLogic,
  updateReviewLogic,
  deleteReviewLogic
} = require("../logic/reviews")
const catchedAsync = require("../utils/catchedAsync")

// READ ITEMS
const getAllReviews =catchedAsync( async (req, res) => {
    const reviews = await getAllReviewsLogic()
    res.status(200).json(reviews)
}, ErrorHandler.getAllReviewsErrorHandler)

const getReviewsByOwner = catchedAsync( async (req,res) => {
    const { ownerId } = req.query
    const reviews = await getReviewsByOwnerLogic(ownerId)
    res.status(200).json(reviews)
}, ErrorHandler.getReviewsByOwnerErrorHandler)

const getReviewsByCaregiver = catchedAsync( async (req,res) => {
    const { caregiverId } = req.query
    const reviews = await getReviewsByCaregiverLogic(caregiverId)
    res.status(200).json(reviews)
}, ErrorHandler.getReviewsByCaregiverErrorHandler)

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
  getReviewsByOwner,
  getReviewsByCaregiver,
  getReview,
  createReview,
  updateReview,
  deleteReview
};
