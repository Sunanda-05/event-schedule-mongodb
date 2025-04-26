import * as RSVPServices from "../services/rsvp.service.js";
import ApiError from "../utils/ApiError";

export const getRSVPByUserEvent = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.eventId;

    if (!userId || !eventId)
      throw new ApiError(400, "UserId and EventId needed");

    const rsvp = await RSVPServices.getRSVPByUserEvent(userId, eventId);
    res.status(200).json(rsvp);
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

export const getRSVPByEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;

    if (!eventId) throw new ApiError(400, "EventId needed");

    const rsvps = await RSVPServices.getRSVPByUserEvent(eventId);
    res.status(200).json(rsvps);
  } catch (error) {
    next(error);
  }
};

export const createRSVP = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.eventId;

    if (!eventId || !userId)
      throw new ApiError(400, "EventId And UserId needed");

    const rsvpDetails = {
      eventId,
      userId,
      status: "attending",
    };

    const rsvp = await RSVPServices.handleRSVP(rsvpDetails);
    res.status(200).json(rsvp);
  } catch (error) {
    next(error);
  }
};

export const updateCheckInTime = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const rsvpId = req.params.eventId;

    if (!rsvpId || !userId || !req.body.checkInTime)
      throw new ApiError(400, "RSVPId and UserId and status needed");

    const rsvpDetails = {
      checkInTime: req.body.checkInTime,
    };

    const rsvp = await RSVPServices.updateRSVP(rsvpId, rsvpDetails);
    res.status(200).json(rsvp);
  } catch (error) {
    next(error);
  }
};

export const updateRSVPStatus = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const rsvpId = req.params.rsvpId;
    const eventId = req.params.eventId;

    if (!rsvpId || !userId || !eventId)
      throw new ApiError(400, "RSVPId And UserId and status needed");

    const rsvpStatus = req.query.status;
    const updatedRSVP =
      rsvpStatus === "enable"
        ? await RSVPServices.enableRSVP(rsvpId, eventId, userId)
        : RSVPServices.disableRSVP(rsvpId, eventId, userId);
    return res.status(200).json(updatedRSVP);
  } catch (error) {
    next(error);
  }
};
