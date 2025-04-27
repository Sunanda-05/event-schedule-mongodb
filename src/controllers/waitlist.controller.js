import * as WaitlistServices from "../services/waitlist.service.js";
import ApiError from "../utils/ApiError.js";

export const getWaitlistByUserEvent = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.eventId;

    if (!userId || !eventId)
      throw new ApiError(400, "UserId and EventId needed");

    const waitlist = await WaitlistServices.getWaitlistByUserEvent(
      userId,
      eventId
    );
    res.status(200).json(waitlist);
  } catch (error) {
    next(error);
  }
};

export const getWaitlistByUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!userId) throw new ApiError(400, "UserId ");

    const waitlists = await WaitlistServices.getWaitlistByUser(userId);
    res.status(200).json(waitlists);
  } catch (error) {
    next(error);
  }
};

export const getWaitlistByEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    if (!eventId) throw new ApiError(400, "EventId needed");

    const waitlists = await WaitlistServices.getWaitlistByUserEvent(eventId);
    res.status(200).json(waitlists);
  } catch (error) {
    next(error);
  }
};
