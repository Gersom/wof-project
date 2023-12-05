const ErrorHandler = require("../handlers/notifications");
const {
  getAllNotificationsLogic,
  getNotificationLogic,
  postNotificationLogic,
  updateNotificationLogic,
  deleteNotificationLogic,
  updateNotificationByUserLogic,
} = require("../logic/notifications");
const catchedAsync = require("../utils/catchedAsync");

// READ ITEMS
const getAllNotifications = catchedAsync(async (req, res) => {
  const notification = await getAllNotificationsLogic(req);
  res.status(200).json(notification);
}, ErrorHandler.getAllNotificationsErrorHandler);

// DETAIL ITEM
const getNotification = catchedAsync(async (req, res) => {
  const { id } = req.params;
  const notification = await getNotificationLogic(id);
  res.status(200).json(notification);
}, ErrorHandler.getNotificationErrorHandler);

// CREATE ITEM
const createNotification = catchedAsync(async (req, res) => {
  const newNotification = await postNotificationLogic(req.body);
  res.status(200).json(newNotification);
}, ErrorHandler.createNotificationErrorHandler);

// UPDATE ITEM
const updateNotificationByUser = catchedAsync(async (req, res) => {
  const { userId } = req.query;
  const { body } = req;
  const updatedNotification = await updateNotificationByUserLogic(userId, body);
  res.status(200).json(updatedNotification);
}, ErrorHandler.updateNotificationErrorHandler);

const updateNotification = catchedAsync(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedNotification = await updateNotificationLogic(id, body);
  res.status(200).json(updatedNotification);
}, ErrorHandler.updateNotificationErrorHandler);

// DELETE ITEM
const deleteNotification = catchedAsync(async (req, res) => {
  const { id } = req.params;
  const deletedNotification = await deleteNotificationLogic(id);
  res.status(200).json(deletedNotification);
}, ErrorHandler.deleteNotificationErrorHandler);

module.exports = {
  getAllNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
  updateNotificationByUser,
};
