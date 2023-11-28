const getAllPetsErrorHandler = (error, req, res, next) => {

    console.error("Error in getAllPets:", error);
    res.status(500).json({ error: "An error occurred while retrieving the pets." });
};

const getPetErrorHandler = (error, req, res, next) => {

    console.error("Error in getPet:", error);
    res.status(500).json({ error: "An error occurred while retrieving the pet." });
};

const createPetErrorHandler = (error, req, res, next) => {

    console.error("Error in createPet:", error);
    res.status(500).json({ error: "An error occurred while creating the pet." });
};

const updatePetErrorHandler = (error, req, res, next) => {

    console.error("Error in updatePet:", error);
    res.status(500).json({ error: "An error occurred while modifying the pet." });
};

const deletePetErrorHandler = (error, req, res, next) => {

    console.error("Error in deletePet:", error);
    res.status(500).json({ error: "An error occurred while deleting the pet." });
};


module.exports = {
    getAllPetsErrorHandler,
    getPetErrorHandler,
    createPetErrorHandler,
    updatePetErrorHandler,
    deletePetErrorHandler
}