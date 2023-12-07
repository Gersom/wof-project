const { TransactionsModel, CaregiversModel } = require("../models");
const { PostsModel } = require("../models");

const getAllTransactionsLogic = async () => {
  const transactions = await TransactionsModel.findAllData();
  return transactions;
};
const getTransactionByPostLogic = async (postId) => {
  const transaction = await TransactionsModel.findOneData("postId", postId);
  return transaction;
};

const postTransactionLogic = async (data) => {
  data.servicePostingId = data.postId;

  const newTransaction = await TransactionsModel.create(data);
  await PostsModel.updateData(data.servicePostingId, {
    status: "paid",
    caregiverId: data.caregiverId,
  });

  // Create Notification
  const notifications = require("./../data/notifications/index");
  const { NotificationsModel } = require("./../models/index");
  await NotificationsModel.create({
    ...notifications?.createdTransaction,
    userId: data.userId,
  });

  const caregiver = CaregiversModel.findDataById(data.caregiverId);
  await NotificationsModel.create({
    ...notifications?.createdTransactionCaregivers,
    userId: caregiver.userId,
  });

  //Update Request ... actualiza el 'state' de la Request  de "pending" a "accepted"
  const { RequestsModel } = require("../models/index");
  const requestId = await RequestsModel.findIdData(
    "servicePostingId",
    data.servicePostingId
  );
  if (!requestId) throw Error("the request does not exist");
  await RequestsModel.updateData(requestId, { state: "accepted" });

  return {
    success: "The new Transaction was created successfully.",
    data: newTransaction,
  };
};

module.exports = {
  getAllTransactionsLogic,
  getTransactionByPostLogic,
  postTransactionLogic,
};
