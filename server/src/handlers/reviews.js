const getAllReviewsErrorHandler = (error, req, res, next) => {

    console.error("Error in getAllReviews:", error);
    res.status(500).json({ error: "An error occurred while retrieving the reviews." });
};

const getReviewsByOwnerErrorHandler = (error, req, res, next) => {

    console.error("Error in getReviewsByOwnerErrorHandler:", error);
    res.status(500).json({ error: "An error occurred while retrieving the owner reviews ." });
};

const getReviewsByCaregiverErrorHandler = (error, req, res, next) => {

    console.error("Error in getReviewsByCaregiverErrorHandler:", error);
    res.status(500).json({ error: "An error occurred while retrieving the caregiver reviews ." });
};

const getReviewErrorHandler = (error, req, res, next) => {

    console.error("Error in getReview:", error);
    res.status(500).json({ error: "An error occurred while retrieving the review." });
};

const createReviewErrorHandler = (error, req, res, next) => {

    console.error("Error in createReview:", error);
    res.status(500).json({ error: "An error occurred while creating the review." });
};

const updateReviewErrorHandler = (error, req, res, next) => {

    console.error("Error in updateReview:", error);
    res.status(500).json({ error: "An error occurred while modifying the review." });
};

const deleteReviewErrorHandler = (error, req, res, next) => {

    console.error("Error in deleteReview:", error);
    res.status(500).json({ error: "An error occurred while deleting the review." });
};


module.exports = {
    getAllReviewsErrorHandler,
    getReviewsByOwnerErrorHandler,
    getReviewsByCaregiverErrorHandler,
    getReviewErrorHandler,
    createReviewErrorHandler,
    updateReviewErrorHandler,
    deleteReviewErrorHandler
}