const getAllOwnersErrorHandler = (error, req, res, next) => {

    console.error("Error in getAllOwners:", error);
    res.status(500).json({ error: "An error occurred while retrieving the owners." });
};

const getOwnerErrorHandler = (error, req, res, next) => {

    console.error("Error in getOwner:", error);
    res.status(500).json({ error: "An error occurred while retrieving the owner." });
};

const getHiredCaregiversErrorHandler = (error, req, res, next) => {

    console.error("Error in getHiredCaregivers:", error);
    res.status(500).json({ error: "An error occurred while retrieving hired caregivers." });
};

const createOwnerErrorHandler = (error, req, res, next) => {

    console.error("Error in createOwner:", error);
    res.status(500).json({ error: "An error occurred while creating the owner." });
};

const updateOwnerErrorHandler = (error, req, res, next) => {

    console.error("Error in updateOwner:", error);
    res.status(500).json({ error: "An error occurred while modifying the owner." });
};

const deleteOwnerErrorHandler = (error, req, res, next) => {

    console.error("Error in deleteOwner:", error);
    res.status(500).json({ error: "An error occurred while deleting the owner." });
};


module.exports = {
    getAllOwnersErrorHandler,
    getOwnerErrorHandler,
    getHiredCaregiversErrorHandler,
    createOwnerErrorHandler,
    updateOwnerErrorHandler,
    deleteOwnerErrorHandler
}