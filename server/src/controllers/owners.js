const ErrorHandler = require("../handlers/owners")
const {
  getAllOwnersService,
  getOwnerService,
  postOwnerService,
  updateOwnerService,
  deleteOwnerService
} = require("../services/internal/owners")
const catchedAsync = require("../utils/catchedAsync")

// READ ITEMS
const getAllOwners =catchedAsync( async (req, res) => {
    const owners = await getAllOwnersService()
    res.status(200).json(owners)
}, ErrorHandler.getAllOwnersErrorHandler)

// DETAIL ITEM
const getOwner =catchedAsync( async (req, res) => {
    const {id} = req.params
    const owner = await getOwnerService(id)
    res.status(200).json(owner);
},ErrorHandler.getOwnerErrorHandler)

// CREATE ITEM
const createOwner =catchedAsync( async (req, res) => {
  
    const newOwner = await postOwnerService(req.body)
    res.status(200).json(newOwner);
  
},ErrorHandler.createOwnerErrorHandler);

// UPDATE ITEM
const updateOwner =catchedAsync( async (req, res) => {
    const { id } = req.params
    const { body } = req
    const updatedOwner = await updateOwnerService(id, body)
    res.status(200).json(updatedOwner)

},ErrorHandler.updateOwnerErrorHandler);

// DELETE ITEM
const deleteOwner =catchedAsync(async (req, res) => {
    const { id } = req.params
    const deletedOwner = await deleteOwnerService(id)
    res.status(200).json(deletedOwner)
}, ErrorHandler.deleteOwnerErrorHandler);

module.exports = {
  getAllOwners,
  getOwner,
  createOwner,
  updateOwner,
  deleteOwner
};
