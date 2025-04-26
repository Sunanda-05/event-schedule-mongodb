import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import RSVP from "../models/rsvp.model.js";
import ApiError from "../utils/ApiError.js";

export const getRSVPById = async (id) => {
  try {
    const rsvp = await RSVP.findById(id)
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");
    return rsvp;
  } catch (error) {}
};

export const getRSVPByEvent = async (eventId, status) => {
  try {
    const rsvps = await RSVP.find({
      eventId,
      status,
    }).populate("userId", "name email");
    return rsvps;
  } catch (error) {}
};

export const getRSVPByUser = async (userId) => {
  try {
    const rsvps = await RSVP.find({
      userId,
    }).populate("eventId", "title shortDescription");
    return rsvps;
  } catch (error) {}
};

export const createRSVP = async (rsvpDetails) => {
  try {
    // const [event, user] = await Promise.all([
    //   await Event.findById(rsvpDetails.eventId),
    //   await User.findById(rsvpDetails.userId),
    // ]);

    // if (!event) throw new ApiError(404, "Event not found");
    // if (!user) throw new ApiError(404, "User not found");

    const newRSVP = await RSVP.create(rsvpDetails)
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");
    return newRSVP;
  } catch (error) {}
};

export const updateRSVP = async (rsvpId, rsvpDetails) => {
  try {
    const updatedRSVP = await RSVP.findByIdAndUpdate(rsvpId, rsvpDetails, {
      new: true,
      runValidators: true,
    })
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");

    if (!updatedRSVP) throw new ApiError(404, "RSVP not found");
    return updatedRSVP;
  } catch (error) {}
};

export const deleteRSVP = async (rsvpId) => {
  try {
    const deletedRSVP = await RSVP.findByIdAndDelete(rsvpId)
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");

    if (!deletedRSVP) throw new ApiError(404, "Waitlist not found");
    return deletedRSVP;
  } catch (error) {}
};
