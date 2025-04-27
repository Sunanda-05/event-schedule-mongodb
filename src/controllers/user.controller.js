import { getUserById } from "../services/user.service.js";
import * as EventRoleServices from "../services/eventRole.service.js";
import * as RSVPServices from "../services/rsvp.service.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
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

export const getRSVPByUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!userId) throw new ApiError(400, "UserId ");

    const rsvps = await RSVPServices.getRSVPByUser(userId);
    res.status(200).json(rsvps);
  } catch (error) {
    next(error);
  }
};
