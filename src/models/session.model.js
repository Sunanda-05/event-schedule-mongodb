import mongoose from "mongoose";
import auditLoggerPlugin from "../utils/AuditLoggerPlugin.js";

export const SessionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    description: String,
    location: String, // room name or specific location within event
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
  },
  {
    timestamps: true,
  }
);
