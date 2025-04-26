import mongoose from "mongoose";
import { SessionSchema } from "./session.model.js";
import auditLoggerPlugin from "../utils/AuditLoggerPlugin";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    shortDescription: String, // for previews
    date: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    location: {
      address: String,
      coordinates: {
        type: { type: String, default: "Point" },
        coordinates: [Number], // [longitude, latitude]
      },
      virtualLink: String, // for online events
    },
    capacity: Number, // max attendees
    price: {
      amount: Number,
      currency: String,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "completed"],
      default: "draft",
    },
    version: { type: Number, default: 1 },
    versionHistory: [
      {
        version: Number,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updatedAt: Date,
        changes: Object, // store what changed
      },
    ],
    images: [String], // URLs to event images
    featuredImage: String,
    attendees: { type: Number, default: 0 }, // Count for quick access
    avgRating: { type: Number, default: 0 }, // Calculated field
    sessions: [SessionSchema],
  },
  {
    timestamps: true,
  }
);

EventSchema.index({ categories: 1, "date.start": 1 });
EventSchema.index({ "location.coordinates": "2dsphere" });
EventSchema.index({ status: 1, "date.start": 1 });
EventSchema.index({ "sessions.startTime": 1 });
EventSchema.index(
  { title: "text", description: "text" },
  { weights: { title: 10, description: 5 } }
);

EventSchema.methods.addSession = function (sessionData) {
  this.sessions.push(sessionData);
  return this.save();
};

EventSchema.methods.updateSession = function (sessionId, updates) {
  const session = this.sessions.id(sessionId);
  if (!session) throw new Error("Session not found");
  Object.assign(session, updates);
  return this.save();
};

EventSchema.methods.removeSession = function (sessionId) {
  const session = this.sessions.id(sessionId);
  if (!session) throw new Error("Session not found");
  session.remove();
  return this.save();
};

EventSchema.virtual("durationMinutes").get(function () {
  return this.date.start && this.date.end
    ? Math.round((this.date.end - this.date.start) / (1000 * 60))
    : 0;
});

EventSchema.virtual("durationHours").get(function () {
  return this.date.start && this.date.end
    ? ((this.date.end - this.date.start) / (1000 * 60 * 60)).toFixed(2)
    : "0.00";
});

EventSchema.statics.updateAvgRating = async function (eventId) {
  const Feedback = mongoose.model("Feedback");
  const result = await Feedback.aggregate([
    {
      $match: {
        eventId: new mongoose.Types.createFromHexString(eventId),
        status: "published",
      },
    },
    {
      $group: {
        _id: "$eventId",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  const avgRating = result.length ? result[0].avgRating : 0;
  await this.findByIdAndUpdate(eventId, { avgRating: avgRating.toFixed(1) });
};

EventSchema.statics.updateAttendees = async function (eventId) {
  const RSVP = mongoose.model("RSVP");
  const count = await RSVP.countDocuments({
    eventId,
    status: "attending",
  });

  await this.findByIdAndUpdate(eventId, {
    attendees: count,
  });
};

EventSchema.statics.getAttendees = async function (eventId) {
  return this.findById(eventId).select("attendees");
};

EventSchema.statics.getCapacity = async function (eventId) {
  return this.findById(eventId).select("capacity");
};

EventSchema.statics.getAvailableSpots = async function (eventId) {
  const event = this.findById(eventId);
  const availableSpots = event.capacity - event.attendees;
  return availableSpots;
};

EventSchema.set("toJSON", { virtuals: true });
EventSchema.set("toObject", { virtuals: true });

EventSchema.plugin(auditLoggerPlugin, { entityType: "event" });

const Event = mongoose.model("Event", EventSchema);
export default Event;
