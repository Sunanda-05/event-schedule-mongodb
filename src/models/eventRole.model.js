import mongoose from "mongoose";
import auditLoggerPlugin from "../utils/AuditLoggerPlugin.js";

const EventRoleSchema = new mongoose.Schema(
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
    role: {
      type: String,
      enum: ["organizer", "participant", "speaker", "volunteer"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

EventRoleSchema.index({ userId: 1, eventId: 1 }, { unique: true });
EventRoleSchema.index({ eventId: 1, role: 1 });

EventRoleSchema.plugin(auditLoggerPlugin, { entityType: "event" });

const EventRole = mongoose.model("EventRole", EventRoleSchema);
export default EventRole;
