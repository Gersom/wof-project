const ErrorHandler = require("../handlers/pets")
const {
  getAllPetsLogic,
  getPetLogic,
  postPetLogic,
  updatePetLogic,
  deletePetLogic
} = require("../logic/pets")
const catchedAsync = require("../utils/catchedAsync")

// READ ITEMS
const getAllPets =catchedAsync( async (req, res) => {
    const pets = await getAllPetsLogic()
    res.status(200).json(pets)
}, ErrorHandler.getAllPetsErrorHandler)

// DETAIL ITEM
const getPet =catchedAsync( async (req, res) => {
    const {id} = req.params
    const pet = await getPetLogic(id)
    res.status(200).json(pet);
},ErrorHandler.getPetErrorHandler)

// CREATE ITEM
const createPet =catchedAsync( async (req, res) => {
  
    const newPet = await postPetLogic(req.body)
    res.status(200).json(newPet);
  
},ErrorHandler.createOwnerErrorHandler);

// UPDATE ITEM
const updatePet =catchedAsync( async (req, res) => {
    const { id } = req.params
    const { body } = req
    const updatedPet = await updatePetLogic(id, body)
    res.status(200).json(updatedPet)

},ErrorHandler.updatePetErrorHandler);

// DELETE ITEM
const deletePet =catchedAsync(async (req, res) => {
    const { id } = req.params
    const deletedPet = await deletePetLogic(id)
    res.status(200).json(deletedPet)
}, ErrorHandler.deletePetErrorHandler);

module.exports = {
  getAllPets,
  getPet,
  createPet,
  updatePet,
  deletePet
};
