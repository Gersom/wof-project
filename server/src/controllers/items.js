const { itemsModel } = require("../models")

const getAllItemsController = async () => {
  const items = await itemsModel.findAllData()
  return items
}

const getItemController = async (id) => {
  const item = await itemsModel.findOneData(id)
  return item
};

const postItemController = async (data) => {
  await itemsModel.create(data)
  return {
    success: 'Item data was saved correctly.'
  }
}

const updateItemController = async (id, data) => {
  await itemsModel.updateData(id, data)
  return {
    success: 'Item data was update correctly.'
  }
}
const deleteItemController = async (id, data) => {
  await itemsModel.removeData(id)
  return {
    success: 'Item data was update correctly.'
  }
}

module.exports = {
  getAllItemsController,
  getItemController,
  postItemController,
  updateItemController,
  deleteItemController
};
