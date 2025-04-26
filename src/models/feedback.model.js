import mongoose from "mongoose";
import auditLoggerPlugin from "../utils/AuditLoggerPlugin";

const FeedbackSchema = new mongoose.Schema(
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
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
    anonymous: { type: Boolean, default: false },
    helpful: {
      count: { type: Number, default: 0 },
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    status: {
      type: String,
      enum: ["published", "pending", "flagged"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

FeedbackSchema.index({ eventId: 1, rating: 1 });
FeedbackSchema.index({ sessionId: 1, rating: 1 });
FeedbackSchema.index({ userId: 1 });

FeedbackSchema.plugin(auditLoggerPlugin, { entityType: "feedback" });

const Feedback = mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
