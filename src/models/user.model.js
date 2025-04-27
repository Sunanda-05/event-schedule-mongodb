import mongoose from "mongoose";
import auditLoggerPlugin from "../utils/AuditLoggerPlugin.js";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    globalRole: { type: String, enum: ["admin", "user"], default: "user" },
    location: {
      type: { 
        type: String, 
        default: "Point", 
        enum: ["Point"] 
      },
      coordinates: {
        type: [Number], //[longitude, latitude]
        required: true, // Ensure coordinates are provided
      },
    },
    preferences: {
      notificationSettings: Object,
      categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    },
  },
  {
    timestamps: true,
  }
);

// indexes
UserSchema.index({ email: 1, role: 1 });
UserSchema.index({ location: "2dsphere" });

UserSchema.plugin(auditLoggerPlugin, { entityType: "user" });

const User = mongoose.model("User", UserSchema);
export default User;
