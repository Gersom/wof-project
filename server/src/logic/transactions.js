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

    // Create Notification
  const notifications = require("./../data/notifications/index")
  const {NotificationsModel} = require("./../models/index")
  await NotificationsModel.create({
    ...notifications?.createdTransaction,
    userId: data.userId
  })

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
