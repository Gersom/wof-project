const getItemsController = async () => {
  throw Error('getItemsController not configured')
}

const getItemDetailController = async (id) => {
  throw Error('id:'+id+', getItemDetailController not configured')
};

module.exports = {
  getItemsController,
  getItemDetailController
};
