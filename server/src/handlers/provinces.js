const getAllProvincesErrorHandler = (error, req, res, next) => {
   
    console.error("Error in getAllProvinces:", error);
    res.status(500).json({ error: "An error occurred while retrieving the provinces." });
};



module.exports = {
    getAllProvincesErrorHandler
}