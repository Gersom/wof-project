const {
  getItemsController,
  getItemDetailController
} = require("../controllers/items")

// READ ITEMS
const getItems = async (req, res) => {
  try {
    const items = await getItemsController()
    res.status(200).send(items)
  }
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

// DETAIL ITEM
const getItemDetail = async (req, res) => {
  try {
    const {id} = req.params
    const item = await getItemDetailController(id)
    res.status(200).send(item);
  } 
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

// CREATE ITEM
const createItem = async (req, res) => {
  try {
    res.status(200).send('createItem not configured');
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

// UPDATE ITEM
const updateItem = async (req, res) => {
  try {
    res.status(200).send('updateItem not configured');
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

// DELETE ITEM
const deleteItem = async (req, res) => {
  try {
    res.status(200).send('deleteItem not configured');
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};



module.exports = {
  getItems,
  getItemDetail,
  createItem,
  updateItem,
  deleteItem
};
