const { TransactionsModel, CaregiversModel } = require("../models");
const { PostsModel } = require("../models");
const calculatePercentage = require("./../utils/calculatePercentage")

const getAllTransactionsLogic = async () => {
  const transactions = await TransactionsModel.findAllData();
  return transactions;
};
const getTransactionByPostLogic = async (postId) => {
  const transaction = await TransactionsModel.findOneData("postId", postId);
  return transaction;
};

const postTransactionLogic = async (data) => {
  if (!data.servicePostingId) {
    data.servicePostingId = data.postId;
  }
  const {
    descuentoAmount, netoAmount
  } = calculatePercentage(Number(data.amount))
  const newTransaction = await TransactionsModel.create({
    ...data, 
    discount: descuentoAmount,
    amountPayCaregiver: netoAmount
  });
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

  const caregiver = await CaregiversModel.findDataById(data.caregiverId);
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

  const caregiversTransactions = await TransactionsModel.findAll({
    where: { caregiverId: data.caregiverId, },
    attributes: ["amount"],
  })
  let totalDueBalance = 0;
  caregiversTransactions.map(d => totalDueBalance = totalDueBalance + Number(d.amount))
  await CaregiversModel.updateData(data.caregiverId, { dueBalance: totalDueBalance })

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
