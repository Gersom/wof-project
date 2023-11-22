const ErrorHandler = require("../handlers/users")
const {
  getAllCaregiversLogic,
  getCaregiverLogic,
  postCaregiverLogic,
  updateCaregiverLogic,
  deleteCaregiverLogic
} = require("../logic/caregivers")
const catchedAsync = require("../utils/catchedAsync")

// READ ITEMS
const getAllCaregivers =catchedAsync( async (req, res) => {
    const caregivers = await getAllCaregiversLogic()
    res.status(200).json(caregivers)
}, ErrorHandler.getAllCaregiversErrorHandler)

// DETAIL ITEM
const getCaregiver =catchedAsync( async (req, res) => {
    const {id} = req.params
    const Caregiver = await getCaregiverLogic(id)
    res.status(200).json(Caregiver);
},ErrorHandler.getCaregiverErrorHandler)

// CREATE ITEM
const createCaregiver =catchedAsync( async (req, res) => {
  
    const newCaregiver = await postCaregiverLogic(req.body)
    res.status(200).json(newCaregiver);
  
},ErrorHandler.createCaregiverErrorHandler);

// UPDATE ITEM
const updateCaregiver =catchedAsync( async (req, res) => {
    const { id } = req.params
    const { body } = req
    const updatedCaregiver = await updateCaregiverLogic(id, body)
    res.status(200).json(updatedCaregiver)

},ErrorHandler.updateCaregiverErrorHandler);

// DELETE ITEM
const deleteCaregiver =catchedAsync(async (req, res) => {
    const { id } = req.params
    const deletedCaregiver = await deleteCaregiverLogic(id)
    res.status(200).json(deletedCaregiver)
}, ErrorHandler.deleteCaregiverErrorHandler);

module.exports = {
  getAllCaregivers,
  getCaregiver,
  createCaregiver,
  updateCaregiver,
  deleteCaregiver
};
