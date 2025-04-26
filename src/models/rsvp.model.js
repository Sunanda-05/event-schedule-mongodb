import mongoose from "mongoose";
import Event from "./event.model.js";
import auditLoggerPlugin from "../utils/AuditLoggerPlugin";

const RSVPSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    status: {
      type: String,
      enum: ["attending", "not attending", "maybe"],
      required: true,
    },
    checkInTime: Date, // when they actually attended
  },
  {
    timestamps: true,
  }
);

RSVPSchema.post("save", async function (doc) {
  if (doc.status === "attending" || doc.isModified("status")) {
    try {
      await Event.updateAttendees(doc.eventId);
    } catch (error) {
      console.error("Error updating attendees count:", error);
    }
  }
});

RSVPSchema.post("findOneAndUpdate", async function (doc) {
  if (doc && doc.status === "attending") {
    await Event.updateAttendees(doc.eventId);
  }
});

RSVPSchema.index({ userId: 1, eventId: 1 }, { unique: true });
RSVPSchema.index({ eventId: 1, status: 1 });
RSVPSchema.index({ eventId: 1, checkInTime: 1 });

RSVPSchema.plugin(auditLoggerPlugin, { entityType: "rsvp" });

const RSVP = mongoose.model("RSVP", RSVPSchema);
export default RSVP;
