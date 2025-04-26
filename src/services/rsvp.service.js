import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import RSVP from "../models/rsvp.model.js";
import Waitlist from "../models/waitlist.model.js";
import ApiError from "../utils/ApiError.js";
import { createWaitlist, updateWaitlist } from "./waitlist.service.js";

export const getRSVPById = async (id) => {
  try {
    const rsvp = await RSVP.findById(id)
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");
    return rsvp;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving rsvp by id");
  }
};

export const getRSVPByUserEvent = async (userId, eventId) => {
  try {
    const rsvp = await RSVP.findOne({ userId, eventId })
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");
    return rsvp;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving rsvp by id");
  }
};

export const getRSVPByEvent = async (eventId, status) => {
  try {
    const rsvps = await RSVP.find({
      eventId,
      status,
    }).populate("userId", "name email");
    return rsvps;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving rsvp by event");
  }
};

export const getRSVPByUser = async (userId) => {
  try {
    const rsvps = await RSVP.find({
      userId,
    }).populate("eventId", "title shortDescription");
    return rsvps;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving rsvp by user");
  }
};

export const createRSVP = async (rsvpDetails) => {
  const newRSVP = await RSVP.create(rsvpDetails)
    .populate("userId", "name email")
    .populate("eventId", "title shortDescription");
  return newRSVP;
};

export const handleRSVP = async (rsvpDetails) => {
  const [event, user] = await Promise.all([
    await Event.findById(rsvpDetails.eventId),
    await User.findById(rsvpDetails.userId),
  ]);

  if (!event) throw new ApiError(404, "Event not found");
  if (!user) throw new ApiError(404, "User not found");

  const availableSpots = await Event.getAvailableSpots(rsvpDetails.eventId);
  if (availableSpots > 0) {
    const newRSVP = await createRSVP(rsvpDetails);
    return {
      data: newRSVP,
      msg: "RSVP Created",
    };
  }

  const waitlistDetails = {
    eventId: rsvpDetails.eventId,
    userId: rsvpDetails.userId,
    status: "waiting",
  };

  const newWaitlist = await createWaitlist(waitlistDetails);
  return {
    data: newWaitlist,
    msg: "Waitlist created",
  };
};

export const updateRSVP = async (rsvpId, userId, rsvpDetails) => {
  const updatedRSVP = await RSVP.findOneAndUpdate(
    { rsvpId, userId },
    rsvpDetails,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("userId", "name email")
    .populate("eventId", "title shortDescription");

  if (!updatedRSVP) throw new ApiError(404, "RSVP not found");
  return updatedRSVP;
};

export const enableRSVP = async (rsvpId, eventId, userId) => {
  const availableSpots = await Event.getAvailableSpots(eventId);

  if (availableSpots === 0) {
    const waitlistDetails = {
      eventId,
      userId,
      status: "waiting",
    };

    const [newWaitlist, deletedRSVP] = await Promise.all([
      createWaitlist(waitlistDetails),
      deleteRSVP(rsvpId),
    ]);

    return {
      data: newWaitlist,
      msg: "Waitlist created",
    };
  }

  const updatedRSVP = await updateRSVP(rsvpId, userId, {
    status: "attending",
  });

  return {
    data: updatedRSVP,
    msg: "RSVP Created",
  };
};

export const disableRSVP = async (rsvpId, eventId, userId) => {
  const updatedRSVP = await updateRSVP(rsvpId, userId, {
    status: "not attending",
  });

  await waitlistToRSVP(eventId, userId);
  return updatedRSVP;
};

export const deleteRSVP = async (rsvpId) => {
  try {
    const deletedRSVP = await RSVP.findByIdAndDelete(rsvpId)
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");

    if (!deletedRSVP) throw new ApiError(404, "Waitlist not found");
    return deletedRSVP;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting rsvp");
  }
};

export const waitlistToRSVP = async (eventId, userId) => {
  const topWaitlistEntry = await Waitlist.findOne({
    eventId: eventId,
    status: "waiting",
  }).sort({ position: 1 });

  if (topWaitlistEntry) {
    const [updatedWaitlist, newRSVP] = await Promise.all([
      updateWaitlist(topWaitlistEntry._id, {
        status: "accepted",
      }),
      createRSVP({
        userId,
        eventId,
        status: "attending",
      }),
    ]);
  }
};
