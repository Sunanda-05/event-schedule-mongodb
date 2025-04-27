import mongoose from "mongoose";
import AuditLog from "../models/auditLog.model.js";
import { getCurrentUser } from "../config/context.js";

const auditLoggerPlugin = (schema, { entityType }) => {
  schema.pre("save", function (next) {
    // console.log("Inside pre-save hook");
    this._wasNew = this.isNew;
    next();
  });

  schema.post(["save", "findOneAndUpdate"], async function (doc, next) {
    try {
      // console.log("Inside post-save/post-update hook");
      const context = getCurrentUser();

      const { user, ipAddress, userAgent } = context;
      if (!doc?._id || !context) return next();
      const userId =
        user?._id ?? new mongoose.Types.ObjectId("000000000000000000000000");

      const action = doc._wasNew ? "create" : "update";

      await AuditLog.create({
        userId,
        action,
        entityType,
        entityId: doc._id,
        details: {
          ...(doc?.title && { title: doc.title }),
          ...(doc?.name && { name: doc.name }),
        },
        ipAddress,
        userAgent,
      });

      next();
    } catch (err) {
      console.error(`[AuditLog] Failed for ${entityType}:`, err);
      next();
    }
  });
};

export default auditLoggerPlugin;
