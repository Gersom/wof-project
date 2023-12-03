const getAllUsersErrorHandler = (error, req, res, next) => {
    console.error("Error in getAllUsersService:", error);

    if (error.name === "ValidationError") {
        res.status(400).json({ error: "Validation error in getAllUsers operation." });
    } else if (error.code === 11000) {
        res.status(409).json({ error: "Duplicate key error in getAllUsers operation." });
    } else if (error.name === "CastError") {
        res.status(400).json({ error: "Invalid ID format in getAllUsers operation." });
    } else {
        res.status(500).json({ error: "Internal server error while retrieving users." });
    }
};

const getUserErrorHandler = (error, req, res, next) => {
    console.error("Error in getUser:", error);

    if (error.name === "NotFoundError") {
        res.status(404).json({ error: "User not found in getUser operation." });
    } else if (error.name === "CastError") {
        res.status(400).json({ error: "Invalid ID format in getUser operation." });
    } else {
        res.status(500).json({ error: "Internal server error while retrieving user." });
    }
};

const createUserErrorHandler = (error, req, res, next) => {
    console.error("Error in postUserService:", error);

    if (error.name === "Data missing") {
        res.status(401).json({ error: "Data is missing, it could be email, name or password" });
    }
    if (error.name === "ValidationError") {
        res.status(400).json({ error: "Validation error in createUser operation." });
    } else {
        res.status(500).json({ error: "Internal server error while creating user." });
    }
};

const updateUserErrorHandler = (error, req, res, next) => {
    console.error("Error in updateUserService:", error);

    if (error.name === "NotFoundError") {
        res.status(404).json({ error: "User not found in updateUser operation." });
    } else if (error.name === "ValidationError") {
        res.status(400).json({ error: "Validation error in updateUser operation." });
    } else {
        res.status(500).json({ error: "Internal server error while updating user." });
    }
};

const deleteUserErrorHandler = (error, req, res, next) => {
    console.error("Error in deleteUserService:", error);

    if (error.name === "NotFoundError") {
        res.status(404).json({ error: "User not found in deleteUser operation." });
    } else {
        res.status(500).json({ error: "Internal server error while deleting user." });
    }
};

const postNewRoleErrorHandler = (error, req, res, next) => {
  console.error("Error in postNewRoleErrorHandler:", error);

  if (error.name === "NotFoundError") {
      res.status(404).json({ error: "User not found in deleteUser operation." });
  } else {
      res.status(500).json({ error: "Internal server error while deleting user." });
  }
};

module.exports = {
    getAllUsersErrorHandler,
    getUserErrorHandler,
    createUserErrorHandler,
    updateUserErrorHandler,
    deleteUserErrorHandler,
    postNewRoleErrorHandler
};
