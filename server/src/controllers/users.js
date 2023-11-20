const {
  getAllUsersController,
  getUserController,
  postUserController,
  updateUserController,
  deleteUserController
} = require("../services/internal_services/users")

// READ ITEMS
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersController()
    res.status(200).json(users)
  }
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

// DETAIL ITEM
const getUser = async (req, res) => {
  try {
    const {id} = req.params
    const user = await getUserController(id)
    res.status(200).json(user);
  } 
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

// CREATE ITEM
const createUser = async (req, res) => {
  try {
    const newUser = await postUserController(req.body)
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

// UPDATE ITEM
const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const updatedUser = await updateUserController(id, body)
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

// DELETE ITEM
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await deleteUserController(id)
    res.status(200).json(deletedUser)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
