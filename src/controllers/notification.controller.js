import * as NotificationServices from "../services/notification.service.js";
import ApiError from "../utils/ApiError.js";

export const createNotification = async (req, res, next) => {
  try {
    const notificationDetails = {
      ...req.body,
      userId: req.user._id,
    };

    const newNotification = await NotificationServices.createNotification(
      notificationDetails
    );
    res.status(201).json(newNotification);
  } catch (error) {
    next(error);
  }
};

export const getUserNotifications = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const notifications = await NotificationServices.getUserNotifications(userId);
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};
