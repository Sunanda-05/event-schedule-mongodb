import mongoose from "mongoose";
import auditLoggerPlugin from "../utils/AuditLoggerPlugin";

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
      //geojson type
      type: { type: String, default: "Point" },
      coordinates: [Number], // [longitude, latitude]
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
