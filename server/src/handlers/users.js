const getAllUsersErrorHandler = (error, req, res, next) => {

    console.error("Error in getAllUsers:", error);
    res.status(500).json({ error: "An error occurred while retrieving the users." });
};

const getUserErrorHandler = (error, req, res, next) => {

    console.error("Error in getUser:", error);
    res.status(500).json({ error: "An error occurred while retrieving the user." });
};

const createUserErrorHandler = (error, req, res, next) => {

    console.error("Error in createUser:", error);
    res.status(500).json({ error: "An error occurred while creating the user." });
};

const updateUserErrorHandler = (error, req, res, next) => {

    console.error("Error in updateUser:", error);
    res.status(500).json({ error: "An error occurred while modifying the user." });
};

const deleteUserErrorHandler = (error, req, res, next) => {

    console.error("Error in deleteUser:", error);
    res.status(500).json({ error: "An error occurred while deleting the user." });
};


module.exports = {
    getAllUsersErrorHandler,
    getUserErrorHandler,
    createUserErrorHandler,
    updateUserErrorHandler,
    deleteUserErrorHandler
}