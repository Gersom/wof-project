const {
  getAllItemsController,
  getItemController,
  postItemController,
  updateItemController,
  deleteItemController
} = require("../controllers/items")

// READ ITEMS
const getAllUsers = async (req, res) => {
  try {
    const items = await getAllItemsController()
    res.status(200).json(items)
  }
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

// DETAIL ITEM
const getUser = async (req, res) => {
  try {
    const {id} = req.params
    const item = await getItemController(id)
    res.status(200).json(item);
  } 
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

// CREATE ITEM
const createUser = async (req, res) => {
  try {
    const success = await postItemController(req.body)
    res.status(200).json(success);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

// UPDATE ITEM
const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const success = await updateItemController(id, body)
    res.status(200).json(success)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

// DELETE ITEM
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const success = await deleteItemController(id)
    res.status(200).json(success)
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
