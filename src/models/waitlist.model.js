import mongoose from "mongoose";
import auditLoggerPlugin from "../utils/AuditLoggerPlugin.js";

const WaitlistSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: { type: Number, required: true },
    status: {
      type: String,
      enum: ["waiting", "offered", "accepted", "declined"],
      default: "waiting",
    },
    notificationSent: Date, // when they were notified of an opening
    responseDeadline: Date, // when their offer expires
  },
  {
    timestamps: true,
  }
);

WaitlistSchema.index({ eventId: 1, position: 1 });
WaitlistSchema.index({ eventId: 1, status: 1 });
WaitlistSchema.index({ responseDeadline: 1 }, { expireAfterSeconds: 0 }); // TTL index

WaitlistSchema.plugin(auditLoggerPlugin, { entityType: "waitlist" });

const Waitlist = mongoose.model("Waitlist", WaitlistSchema);
export default Waitlist;
