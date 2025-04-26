import AuditLog from "../models/auditLog.model.js";

const auditLoggerPlugin = (schema, { entityType }) => {
  schema.pre("save", function (next) {
    this._wasNew = this.isNew;
    next();
  });

  schema.post(["save", "findOneAndUpdate"], async function (doc, next) {
    try {
      const context = this.getOptions?.() || {}; // works with save() & update ops
      const { userId, ipAddress, userAgent } = context;

      if (!userId || !doc?._id) return next();

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
