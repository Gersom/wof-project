const ErrorHandler = require("../handlers/owners")
const {
  getAllOwnersLogic,
  getOwnerLogic,
  getHiredCaregiversLogic,
  postOwnerLogic,
  updateOwnerLogic,
  deleteOwnerLogic
} = require("../logic/owners")
const catchedAsync = require("../utils/catchedAsync")

// READ ITEMS
const getAllOwners =catchedAsync( async (req, res) => {
    const owners = await getAllOwnersLogic()
    res.status(200).json(owners)
}, ErrorHandler.getAllOwnersErrorHandler)

// DETAIL ITEM
const getOwner =catchedAsync( async (req, res) => {
    const {id} = req.params
    const owner = await getOwnerLogic(id)
    res.status(200).json(owner);
},ErrorHandler.getOwnerErrorHandler)

const getHiredCaregivers = catchedAsync( async (req,res) => {
    const { id } = req.params
    const hiredCaregivers = await getHiredCaregiversLogic(id)
    res.status(200).json(hiredCaregivers)
},ErrorHandler.getHiredCaregivers)

// CREATE ITEM
const createOwner =catchedAsync( async (req, res) => {
  
    const newOwner = await postOwnerLogic(req.body)
    res.status(200).json(newOwner);
  
},ErrorHandler.createOwnerErrorHandler);

// UPDATE ITEM
const updateOwner =catchedAsync( async (req, res) => {
    const { id } = req.params
    const { body } = req
    const updatedOwner = await updateOwnerLogic(id, body)
    res.status(200).json(updatedOwner)

},ErrorHandler.updateOwnerErrorHandler);

// DELETE ITEM
const deleteOwner =catchedAsync(async (req, res) => {
    const { id } = req.params
    const deletedOwner = await deleteOwnerLogic(id)
    res.status(200).json(deletedOwner)
}, ErrorHandler.deleteOwnerErrorHandler);

module.exports = {
  getAllOwners,
  getOwner,
  getHiredCaregivers,
  createOwner,
  updateOwner,
  deleteOwner
};
