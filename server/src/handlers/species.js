const getSpeciesErrorHandler = (error, req, res, next) => {

    console.error("Error in getSpecies:", error);
    res.status(500).json({ error: "An error occurred while retrieving the species." });
};


module.exports = {
    getSpeciesErrorHandler
}