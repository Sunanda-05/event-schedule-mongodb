/** @type {import("../models/event.model.js").default} */

import Event from "../models/event.model.js";
import { createEventRole } from "./eventRole.service.js";
import ApiError from "../utils/ApiError.js";
import { notifySpeakerAdded } from "../utils/sendNotification.js";

export const addSessionToEvent = async (eventId, sessionData) => {
  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, "Event not found");

  const session = await event.addSession(sessionData);

  const speakerRoles = (sessionData.speakers || []).map((speaker) => ({
    userId: speaker.userId,
    eventId,
    role: "speaker",
  }));

  await Promise.all(
    speakerRoles.map(async (role) => {
      try {
        await createEventRole(role);
        await notifySpeakerAdded(eventId, role.userId);
      } catch (err) {
        console.log("Error in speaker setup:", err);
      }
    })
  );

  return session;
};

export const updateSessionInEvent = async (eventId, sessionId, updates) => {
  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, "Event not found");

  const updated = await event.updateSession(sessionId, updates);
  return updated;
};

export const removeSessionFromEvent = async (eventId, sessionId) => {
  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, "Event not found");

  const result = await event.removeSession(sessionId);
  return result;
};
