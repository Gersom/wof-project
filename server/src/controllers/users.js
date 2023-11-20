const {
  getAllUsersService,
  getUserService,
  postUserService,
  updateUserService,
  deleteUserService
} = require("../services/internal_services/users")
const catchedAsync = require("../utils/catchedAsync")

// READ ITEMS
const getAllUsers =catchedAsync( async (req, res) => {
    const users = await getAllUsersService()
    res.status(200).json(users)
}, )

// DETAIL ITEM
const getUser =catchedAsync( async (req, res) => {
    const {id} = req.params
    const user = await getUserService(id)
    res.status(200).json(user);
},)

// CREATE ITEM
const createUser =catchedAsync( async (req, res) => {
  
    const newUser = await postUserService(req.body)
    res.status(200).json(newUser);
 
    res.status(500).json({error: error.message});
  
},);

// UPDATE ITEM
const updateUser =catchedAsync( async (req, res) => {
    const { id } = req.params
    const { body } = req
    const updatedUser = await updateUserService(id, body)
    res.status(200).json(updatedUser)

},);

// DELETE ITEM
const deleteUser =catchedAsync(async (req, res) => {
    const { id } = req.params
    const deletedUser = await deleteUserService(id)
    res.status(200).json(deletedUser)
}, );

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
