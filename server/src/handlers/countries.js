const getCountriesErrorHandler = (error, req, res, next) => {

    console.error("Error in getCountries:", error);
    res.status(500).json({ error: "An error occurred while retrieving the countries." });
};


module.exports = {
    getCountriesErrorHandler
}