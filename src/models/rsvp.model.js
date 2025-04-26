import mongoose from "mongoose";
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

RSVPSchema.index({ userId: 1, eventId: 1 }, { unique: true });
RSVPSchema.index({ eventId: 1, status: 1 });
RSVPSchema.index({ eventId: 1, checkInTime: 1 });

RSVPSchema.plugin(auditLoggerPlugin, { entityType: "rsvp" });

const RSVP = mongoose.model("RSVP", RSVPSchema);
export default RSVP;
