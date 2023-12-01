const { NotificationsModel } = require("../models");

const getAllNotificationsLogic = async (req) => {
  const { userId } = req.query 
  const notifications = await NotificationsModel.findAll({
    where: userId ? {userId} : {}
  })
  return notifications
}

const getNotificationLogic = async (id) => {
  const notification = await NotificationsModel.findDataById(id)
  if (!notification) throw Error("Notification not found")
  return notification
};

const postNotificationLogic = async (data) => {
  const newNotification = await NotificationsModel.create(data)
  return newNotification
  }
//   return {
//     success: 'The user was created successfully.'
//   }
                                
const updateNotificationByUserLogic = async (userId, data) => {
    const userNotifications = await NotificationsModel.findAll({ where: { userId } });
    if(!userNotifications.length) throw Error("the user has not notification")
    for (const notification of userNotifications) {
      await notification.update(data);
    }

    return {
      success: 'Notifications were updated correctly.'
    };
}

const updateNotificationLogic = async (id, data) => {
  await NotificationsModel.updateData(id, data)
  return {
    success: 'Notification was update correctly.'
  }
}
const deleteNotificationLogic = async (id) => {
  await NotificationsModel.removeData(id)
  return {
    success: 'Notification was deleted correctly.'
  }
}

module.exports = {
  getAllNotificationsLogic,
  getNotificationLogic,
  postNotificationLogic,
  updateNotificationLogic,
  deleteNotificationLogic,
  updateNotificationByUserLogic
};