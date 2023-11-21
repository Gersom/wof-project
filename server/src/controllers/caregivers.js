const ErrorHandler = require("../handlers/users")
const {
  getAllCaregiversService,
  getCaregiverService,
  postCaregiverService,
  updateCaregiverService,
  deleteCaregiverService
} = require("../services/internal_services/caregivers")
const catchedAsync = require("../utils/catchedAsync")

// READ ITEMS
const getAllCaregivers =catchedAsync( async (req, res) => {
    const caregivers = await getAllCaregiversService()
    res.status(200).json(caregivers)
}, ErrorHandler.getAllCaregiversErrorHandler)

// DETAIL ITEM
const getCaregiver =catchedAsync( async (req, res) => {
    const {id} = req.params
    const Caregiver = await getCaregiverService(id)
    res.status(200).json(Caregiver);
},ErrorHandler.getCaregiverErrorHandler)

// CREATE ITEM
const createCaregiver =catchedAsync( async (req, res) => {
  
    const newCaregiver = await postCaregiverService(req.body)
    res.status(200).json(newCaregiver);
  
},ErrorHandler.createCaregiverErrorHandler);

// UPDATE ITEM
const updateCaregiver =catchedAsync( async (req, res) => {
    const { id } = req.params
    const { body } = req
    const updatedCaregiver = await updateCaregiverService(id, body)
    res.status(200).json(updatedCaregiver)

},ErrorHandler.updateCaregiverErrorHandler);

// DELETE ITEM
const deleteCaregiver =catchedAsync(async (req, res) => {
    const { id } = req.params
    const deletedCaregiver = await deleteCaregiverService(id)
    res.status(200).json(deletedCaregiver)
}, ErrorHandler.deleteCaregiverErrorHandler);

module.exports = {
  getAllCaregivers,
  getCaregiver,
  createCaregiver,
  updateCaregiver,
  deleteCaregiver
};
