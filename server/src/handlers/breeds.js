const getBreedsErrorHandler = (error, req, res, next) => {

    console.error("Error in getBreeds:", error);
    res.status(500).json({ error: "An error occurred while retrieving the breeds." });
};


module.exports = {
    getBreedsErrorHandler
}