const notificationTexts = {
  eventUpdate: (eventName) => ({
    title: "Event Updated",
    message: `The event '${eventName}' has been updated. Please check for the latest details.`,
    type: "update",
    action: {
      type: "link",
      text: "View Event",
      url: `/events/${eventName}`,
    },
  }),

  eventCancellation: (eventName) => ({
    title: "Event Cancelled",
    message: `We regret to inform you that the event '${eventName}' has been cancelled. We apologize for any inconvenience caused.`,
    type: "cancellation",
    action: {
      type: "link",
      text: "View Event",
      url: `/events/${eventName}`,
    },
  }),

  speakerAdded: (eventName, speakerName) => ({
    title: "New Speaker Added",
    message: `A new speaker, '${speakerName}', has been added to the event '${eventName}'.`,
    type: "update",
    action: {
      type: "link",
      text: "View Event",
      url: `/events/${eventName}`,
    },
  }),

  speakerRemoved: (eventName, speakerName) => ({
    title: "Speaker Removed",
    message: `The speaker '${speakerName}' has been removed from the event '${eventName}'.`,
    type: "update",
    action: {
      type: "link",
      text: "View Event",
      url: `/events/${eventName}`,
    },
  }),

  userAddedToWaitlist: (eventName) => ({
    title: "Added to Waitlist",
    message: `You have been added to the waitlist for the event '${eventName}'. You will be notified if a spot becomes available.`,
    type: "reminder",
    action: {
      type: "link",
      text: "View Event",
      url: `/events/${eventName}`,
    },
  }),

  userRemovedFromWaitlist: (eventName) => ({
    title: "Removed from Waitlist",
    message: `You have been removed from the waitlist for the event '${eventName}'.`,
    type: "update",
    action: {
      type: "link",
      text: "View Event",
      url: `/events/${eventName}`,
    },
  }),

  userAddedToRsvp: (eventName) => ({
    title: "RSVP Confirmation",
    message: `You have successfully RSVP'd for the event '${eventName}'. We look forward to your participation!`,
    type: "update",
    action: {
      type: "link",
      text: "View Event",
      url: `/events/${eventName}`,
    },
  }),

  userRemovedFromRsvp: (eventName) => ({
    title: "RSVP Cancelled",
    message: `Your RSVP for the event '${eventName}' has been cancelled.`,
    type: "update",
    action: {
      type: "link",
      text: "View Event",
      url: `/events/${eventName}`,
    },
  }),

  volunteerAdded: (eventName, volunteerName) => ({
    title: "New Volunteer Added",
    message: `A new volunteer, '${volunteerName}', has been added to the event '${eventName}'.`,
    type: "update",
    action: {
      type: "link",
      text: "View Event",
      url: `/events/${eventName}`,
    },
  }),

  volunteerRemoved: (eventName, volunteerName) => ({
    title: "Volunteer Removed",
    message: `The volunteer '${volunteerName}' has been removed from the event '${eventName}'.`,
    type: "update",
    action: {
      type: "link",
      text: "View Event",
      url: `/events/${eventName}`,
    },
  }),
};

export default notificationTexts;
