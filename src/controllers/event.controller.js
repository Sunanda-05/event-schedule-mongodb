import * as EventServices from "../services/event.service.js";
import ApiError from "../utils/ApiError.js";

export const getEventById = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    if (!eventId) throw new ApiError(400, "Event ID is required");

    const event = await EventServices.getEventById(eventId);
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await EventServices.getAllEvents(req.query);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    if (!eventId) throw new ApiError(400, "Event ID is required");

    const updatedEvent = await EventServices.updateEvent(eventId, req.body);
    res.status(200).json(updatedEvent);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    if (!eventId) throw new ApiError(400, "Event ID is required");

    const deletedEvent = await EventServices.deleteEvent(eventId);
    res.status(200).json(deletedEvent);
  } catch (error) {
    next(error);
  }
};

export const getUpcomingEvents = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const events = await EventServices.getUpcomingEvents(userId);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventsByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) throw new ApiError(400, "Category ID is required");

    const events = await EventServices.getEventsByCategory(categoryId);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const getNearbyEvents = async (req, res, next) => {
  try {
    const { lng, lat } = req.query;
    if (!lng || !lat) throw new ApiError(400, "Coordinates are required");

    const coords = [parseFloat(lng), parseFloat(lat)];
    const radius = parseFloat(req.query.radius) || 10;

    const events = await EventServices.getNearbyEvents(coords, radius);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const getPublishedEvents = async (req, res, next) => {
  try {
    const events = await EventServices.getPublishedEvents();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const getVersionHistory = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    if (!eventId) throw new ApiError(400, "Event ID is required");

    const history = await EventServices.getVersionHistory(eventId);
    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!req.body.title || !req.body.date?.start || !req.body.date?.end) {
      throw new ApiError(400, "Title and start/end dates are required");
    }

    const eventDetails = {
      ...req.body,
      createdBy: userId,
    };

    const newEvent = await EventServices.createEvent(eventDetails);
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};
