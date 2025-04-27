import mongoose from "mongoose";
import auditLoggerPlugin from "../utils/AuditLoggerPlugin.js";

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    entityType: {
      type: String,
      enum: ["event", "rsvp", "waitlist"],
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "entityType",
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["reminder", "update", "cancellation"],
      required: true,
    },
    status: { type: String, enum: ["unread", "read"], default: "unread" },
    action: {
      type: { type: String, enum: ["link", "button"] },
      text: String,
      url: String,
    },
    expireAt: Date, // when to auto-delete old notifications
    createdAt: { type: Date, default: Date.now },
    readAt: Date,
  },
  {
    timestamps: true,
  }
);

NotificationSchema.index({ userId: 1, status: 1 });
NotificationSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

NotificationSchema.plugin(auditLoggerPlugin, { entityType: "notification" });

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
