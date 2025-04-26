import * as SessionServices from "../services/session.service.js";
import ApiError from "../utils/ApiError.js";

export const createSession = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const session = await SessionServices.addSessionToEvent(eventId, req.body);
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

export const updateSession = async (req, res, next) => {
  try {
    const { eventId, sessionId } = req.params;
    const session = await SessionServices.updateSessionInEvent(
      eventId,
      sessionId,
      req.body
    );
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

export const deleteSession = async (req, res, next) => {
  try {
    const { eventId, sessionId } = req.params;
    const result = await SessionServices.removeSessionFromEvent(
      eventId,
      sessionId
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
