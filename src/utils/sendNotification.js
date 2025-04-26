import { createNotification } from "../services/notification.service.js";
import notificationTexts from "../utils/notification.util.js";
import User from "../models/user.model.js";
import Event from "../models/event.model.js";

const notifySpeakerAdded = async (eventId, speakerId) => {
  try {
    const event = await Event.findById(eventId);
    const speaker = await User.findById(speakerId);

    const speakerNotification = notificationTexts.speakerAdded(
      event.title,
      speaker.name
    );

    await createNotification({
      userId: speaker._id,
      entityType: "event",
      entityId: event._id,
      title: speakerNotification.title,
      message: speakerNotification.message,
      type: speakerNotification.type,
      action: speakerNotification.action,
    });
  } catch (error) {
    console.error("Error in speaker added notification:", error);
  }
};

const notifyRsvpAdded = async (eventId, userId) => {
  try {
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    const rsvpNotification = notificationTexts.userAddedToRsvp(event.title);

    await createNotification({
      userId: user._id,
      entityType: "event",
      entityId: event._id,
      title: rsvpNotification.title,
      message: rsvpNotification.message,
      type: rsvpNotification.type,
      action: rsvpNotification.action,
    });
  } catch (error) {
    console.error("Error in RSVP added notification:", error);
  }
};

const notifyWaitlistAdded = async (eventId, userId) => {
  try {
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    const waitlistNotification = notificationTexts.userAddedToWaitlist(
      event.title
    );

    await createNotification({
      userId: user._id,
      entityType: "event",
      entityId: event._id,
      title: waitlistNotification.title,
      message: waitlistNotification.message,
      type: waitlistNotification.type,
      action: waitlistNotification.action,
    });
  } catch (error) {
    console.error("Error in waitlist added notification:", error);
  }
};

export { notifySpeakerAdded, notifyRsvpAdded, notifyWaitlistAdded };
