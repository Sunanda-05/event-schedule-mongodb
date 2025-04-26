import EventRole from "../models/eventRole.model.js";
import ApiError from "../utils/ApiError.js";

const authorizeRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user._id;
      const eventId = req.params.eventId || req.params.id || req.body.eventId;

      if (!eventId)
        throw new ApiError(400, "Event ID is required for authorization");

      const roleDoc = await EventRole.findOne({ userId, eventId });
      if (!roleDoc || !allowedRoles.includes(roleDoc.role)) {
        throw new ApiError(
          403,
          "Forbidden: You are not authorized to perform this action"
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default authorizeRole;
