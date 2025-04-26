import Notification from "../models/notification.model.js";

export const createNotification = async (notificationDetails) => {
  try {
    const newNotification = await Notification.create(notificationDetails)
      .populate("userId", "name email")
      .populate("entityId");
    return newNotification;
  } catch (error) {}
};

export const getUserNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .populate("entityId");

    return notifications;
  } catch (error) {}
};
