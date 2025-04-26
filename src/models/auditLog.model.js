import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  entityType: { type: String, required: true }, // "event", "user", "rsvp", etc.
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  details: Object, // additional context
  ipAddress: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now },
});

AuditLogSchema.index({ userId: 1 });
AuditLogSchema.index({ entityId: 1, entityType: 1 });
// Optional TTL index for data retention
// AuditLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 });  // 90 days

const AuditLog = mongoose.model("AuditLog", AuditLogSchema);
export default AuditLog;
