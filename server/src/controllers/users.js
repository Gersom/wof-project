const ErrorHandler = require("../handlers/users")
const {
  getAllUsersLogic,
  getUserLogic,
  postUserLogic,
  updateUserLogic,
  deleteUserLogic
} = require("../logic/users")
const catchedAsync = require("../utils/catchedAsync")

// READ ITEMS
const getAllUsers =catchedAsync( async (req, res) => {
    const users = await getAllUsersLogic()
    res.status(200).json(users)
}, ErrorHandler.getAllUsersErrorHandler)

// DETAIL ITEM
const getUser =catchedAsync( async (req, res) => {
    const {id} = req.params
    const user = await getUserLogic(id)
    res.status(200).json(user);
},ErrorHandler.getUserErrorHandler)

// CREATE ITEM
const createUser =catchedAsync( async (req, res) => {
  
    const newUser = await postUserLogic(req.body)
    res.status(200).json(newUser);
  
},ErrorHandler.createUserErrorHandler);

// UPDATE ITEM
const updateUser =catchedAsync( async (req, res) => {
    const { id } = req.params
    const { body } = req
    const updatedUser = await updateUserLogic(id, body)
    res.status(200).json(updatedUser)

},ErrorHandler.updateUserErrorHandler);

// DELETE ITEM
const deleteUser =catchedAsync(async (req, res) => {
    const { id } = req.params
    const deletedUser = await deleteUserLogic(id)
    res.status(200).json(deletedUser)
}, ErrorHandler.deleteUserErrorHandler);

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
