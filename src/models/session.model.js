import mongoose from "mongoose";
import auditLoggerPlugin from "../utils/AuditLoggerPlugin";

export const SessionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    description: String,
    location: String, // room name or specific location within event
    capacity: Number,
    speakers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String, // denormalized for quick access
        bio: String,
        imageUrl: String,
      },
    ],
    materials: [
      {
        title: String,
        type: { type: String, enum: ["pdf", "video", "link"] },
        url: String,
      },
    ],
    attendees: { type: Number, default: 0 }, // Count for quick access
    avgRating: { type: Number, default: 0 }, // Calculated field
  },
  {
    timestamps: true,
  }
);
