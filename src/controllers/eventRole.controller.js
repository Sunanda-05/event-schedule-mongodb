import * as EventRoleServices from "../services/eventRole.service.js";
import ApiError from "../utils/ApiError.js";

export const createEventRole = async (req, res, next) => {
  try {
    const roleDetails = {
      ...req.body,
      userId: req.body.userId || req.user._id,
    };

    const newRole = await EventRoleServices.createEventRole(roleDetails);
    res.status(201).json(newRole);
  } catch (error) {
    next(error);
  }
};

export const getRolesByEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    if (!eventId) throw new ApiError(400, "Event ID is required");

    const roles = await EventRoleServices.getRolesByEvent(eventId);
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

export const getRolesByUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const roles = await EventRoleServices.getRolesByUser(userId);
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

export const deleteEventRole = async (req, res, next) => {
  try {
    const eventRoleId = req.params.id;
    if (!eventRoleId) throw new ApiError(400, "Event Role ID is required");

    const deletedRole = await EventRoleServices.deleteEventRole(eventRoleId);
    res.status(200).json(deletedRole);
  } catch (error) {
    next(error);
  }
};
