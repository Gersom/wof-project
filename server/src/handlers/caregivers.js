const getAllCaregiversErrorHandler = (error, req, res, next) => {

    console.error("Error in getAllCaregivers:", error);
    res.status(500).json({ error: "An error occurred while retrieving the caregivers." });
};

const getCaregiverErrorHandler = (error, req, res, next) => {

    console.error("Error in getCaregiver:", error);
    res.status(500).json({ error: "An error occurred while retrieving the caregiver." });
};

const createCaregiverErrorHandler = (error, req, res, next) => {

    console.error("Error in createCaregiver:", error);
    res.status(500).json({ error: "An error occurred while creating the caregivers." });
};

const updateCaregiverErrorHandler = (error, req, res, next) => {

    console.error("Error in updateCaregiver:", error);
    res.status(500).json({ error: "An error occurred while modifying the caregivers." });
};

const deleteCaregiverErrorHandler = (error, req, res, next) => {

    console.error("Error in deleteCaregiver:", error);
    res.status(500).json({ error: "An error occurred while deleting the caregivers." });
};


module.exports = {
    getAllCaregiversErrorHandler,
    getCaregiverErrorHandler,
    createCaregiverErrorHandler,
    updateCaregiverErrorHandler,
    deleteCaregiverErrorHandler
}