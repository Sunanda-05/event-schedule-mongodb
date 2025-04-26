import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import Waitlist from "../models/waitlist.model.js";
import ApiError from "../utils/ApiError.js";

export const getWaitlistById = async (id) => {
  try {
    const waitlist = await Waitlist.findById(id)
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");
    return waitlist;
  } catch (error) {}
};

export const getWaitlistByEvent = async (eventId, status) => {
  try {
    const waitlists = await Waitlist.find({
      eventId,
      status,
    }).populate("userId", "name email");
    return waitlists;
  } catch (error) {}
};

export const getWaitlistByUser = async (userId) => {
  try {
    const waitlists = await Waitlist.find({
      userId,
    }).populate("eventId", "title shortDescription");
    return waitlists;
  } catch (error) {}
};

export const createWaitlist = async (waitlistDetails) => {
  try {
    // const [event, user] = await Promise.all([
    //   await Event.findById(waitlistDetails.eventId),
    //   await User.findById(waitlistDetails.userId),
    // ]);

    // if (!event) throw new ApiError(404, "Event not found");
    // if (!user) throw new ApiError(404, "User not found");

    const newWaitlist = await Waitlist.create(waitlistDetails)
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");
    return newWaitlist;
  } catch (error) {}
};

export const updateWaitlist = async (waitlistId, waitlistDetails) => {
  try {
    const updatedWaitlist = await Waitlist.findByIdAndUpdate(
      waitlistId,
      waitlistDetails,
      { new: true, runValidators: true }
    )
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");

    if (!updatedWaitlist) throw new ApiError(404, "Waitlist not found");
    return updatedWaitlist;
  } catch (error) {}
};

export const deleteWaitlist = async (waitlistId) => {
  try {
    const deletedWaitlist = await Waitlist.findByIdAndDelete(waitlistId)
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");

    if (!deletedWaitlist) throw new ApiError(404, "Waitlist not found");
    return deletedWaitlist;
  } catch (error) {}
};
