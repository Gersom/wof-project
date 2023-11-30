const getAllNotificationsErrorHandler = (error, req, res, next) => {

    console.error("Error in getAllNotifications:", error);
    res.status(500).json({ error: "An error occurred while retrieving the notification." });
};

const getNotificationErrorHandler = (error, req, res, next) => {

    console.error("Error in getNotification:", error);
    res.status(500).json({ error: "An error occurred while retrieving the notification." });
};

const createNotificationErrorHandler = (error, req, res, next) => {

    console.error("Error in createNotification:", error);
    res.status(500).json({ error: "An error occurred while creating the notification." });
};

const updateNotificationErrorHandler = (error, req, res, next) => {

    console.error("Error in updateNotification:", error);
    res.status(500).json({ error: "An error occurred while modifying the notification." });
};

const deleteNotificationErrorHandler = (error, req, res, next) => {

    console.error("Error in deleteNotification:", error);
    res.status(500).json({ error: "An error occurred while deleting the notification." });
};


module.exports = {
    getAllNotificationsErrorHandler,
    getNotificationErrorHandler,
    createNotificationErrorHandler,
    updateNotificationErrorHandler,
    deleteNotificationErrorHandler
}