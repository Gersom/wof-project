const { TransactionsModel } = require("../models")
const { PostsModel } = require("../models")

const getAllTransactionsLogic = async () => {
  const transactions = await TransactionsModel.findAllData()
  return transactions
}
const getTransactionByPostLogic = async (postId) => {
    const transaction = await TransactionsModel.findOneData("postId", postId)
    return transaction
}

const postTransactionLogic = async (data) => {
    const newTransaction = await TransactionsModel.create(data)
    await PostsModel.updateData(data.postId, {status: "paid", caregiverId: data.caregiverId})
    return {
      success: 'The new Transaction was created successfully.',
      data: newTransaction
    }
}


module.exports = {
  getAllTransactionsLogic,
  getTransactionByPostLogic,
  postTransactionLogic,
};
