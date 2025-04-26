import Event from "../models/event.model.js";
import ApiError from "../utils/ApiError.js";
import { createEventRole } from "./eventRole.service.js";

export const getEventById = async (id) => {
  try {
    const event = await Event.findById(id)
      .populate("createdBy", "name email")
      .populate("categories")
      .populate("versionHistory.updatedBy", "name email")
      .lean();

    if (!event) throw new ApiError(404, "Event not found");

    const lastVersion = event.versionHistory?.at(-1);
    event.latestUpdatedBy = lastVersion?.updatedBy || null;
    return event;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving event");
  }
};

export const getAllEvents = async ({
  filter = {},
  sort = { "date.start": 1 },
  page = 1,
  limit = 10,
  search = "",
}) => {
  try {
    const query = {};

    if (search) {
      query.$text = { $search: search };
    }

    Object.assign(query, filter);

    const skip = (page - 1) * limit;

    const events = await Event.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("categories", "name slug")
      .populate("createdBy", "name email")
      .lean();

    const total = await Event.countDocuments(query);

    return {
      total,
      page,
      pageSize: events.length,
      events,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving events");
  }
};

export const updateEvent = async (eventId, eventDetails) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventDetails, {
      new: true,
      runValidators: true,
    })
      .populate("createdBy", "name email")
      .populate("categories", "name")
      .populate("eventId", "title shortDescription");

    if (!updatedEvent) throw new ApiError(404, "Event not found");
    return updatedEvent;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating events");
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId)
      .populate("createdBy", "name email")
      .populate("eventId", "title shortDescription");

    if (!deletedEvent) throw new ApiError(404, "Event not found");
    return deletedEvent;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting events");
  }
};

export const getUpcomingEvents = async (userId) => {
  try {
    const now = new Date();

    const events = await Event.find({
      createdBy: userId,
      "date.start": { $gte: now },
      status: { $in: ["published", "draft"] },
    })
      .sort({ "date.start": 1 })
      .populate("categories", "name")
      .populate("createdBy", "name")
      .lean();

    events.forEach((event) => {
      const last = event.versionHistory?.at(-1);
      event.latestUpdatedBy = last?.updatedBy || null;
      delete event.versionHistory;
    });

    return events;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting upcoming events");
  }
};

export const getEventsByCategory = async (catId) => {
  try {
    const events = await Event.find({
      categories: catId,
      status: "published",
    })
      .sort({ "date.start": 1 })
      .populate("categories", "name slug")
      .populate("createdBy", "name email")
      .lean();

    events.forEach((event) => {
      const last = event.versionHistory?.at(-1);
      event.latestUpdatedBy = last?.updatedBy || null;
      delete event.versionHistory;
    });

    return events;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving events by category");
  }
};

export const getNearbyEvents = async (coords, radiusInKm = 10) => {
  try {
    const [lng, lat] = coords;

    const events = await Event.find({
      "location.coordinates": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: radiusInKm * 1000,
        },
      },
      status: "published",
      "date.start": { $gte: new Date() },
    })
      .populate("categories", "name")
      .populate("createdBy", "name")
      .lean();

    events.forEach((event) => {
      const last = event.versionHistory?.at(-1);
      event.latestUpdatedBy = last?.updatedBy || null;
      delete event.versionHistory;
    });

    return events;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving nearby events");
  }
};

export const getPublishedEvents = async () => {
  try {
    const events = await Event.find({
      status: "published",
      "date.start": { $gte: new Date() },
    })
      .sort({ "date.start": 1 })
      .populate("categories", "name")
      .populate("createdBy", "name")
      .lean();

    events.forEach((event) => {
      const last = event.versionHistory?.at(-1);
      event.latestUpdatedBy = last?.updatedBy || null;
      delete event.versionHistory;
    });

    return events;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving published events");
  }
};

export const getVersionHistory = async (eventId) => {
  try {
    const event = await Event.findById(eventId)
      .select("versionHistory")
      .populate("versionHistory.updatedBy", "name email")
      .lean();

    if (!event) throw new Error("Event not found");

    return event.versionHistory || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving version history");
  }
};

export const createEvent = async (eventDetails) => {
  try {
    const newEvent = await Event.create(eventDetails);

    await createEventRole({
      eventId: newEvent._id,
      userId: newEvent.createdBy,
      role: "organizer",
    });

    const populatedEvent = await Event.findById(newEvent._id)
      .populate("createdBy", "name email")
      .populate("categories", "name slug");

    return populatedEvent;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error creating event");
  }
};