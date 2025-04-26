import EventRole from "../models/eventRole.model.js";

export const createEventRole = async (eventRoleDetails) => {
  try {
    const newEventRole = await Notification.create(eventRoleDetails)
      .populate("userId", "name email")
      .populate("eventId");
    return newEventRole;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating eventrole");
  }
};

export const getRolesByEvent = async (eventId) => {
  try {
    const roles = await EventRole.find({
      eventId,
    })
      .sort({ createdAt: -1 })
      .populate("eventId")
      .populate("userId", "name email");

    return roles;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving eventrole by eventid");
  }
};

export const getRolesByUser = async (userId) => {
  try {
    const roles = await EventRole.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .populate("entityId");

    return roles;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving eventrole by user");
  }
};

export const deleteEventRole = async (eventRoleId) => {
  try {
    const deletedRole = await EventRole.findByIdAndDelete(eventRoleId)
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");

    if (!deletedRole) throw new ApiError(404, "Event Role not found");
    return deletedRole;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting eventrole");
  }
};
