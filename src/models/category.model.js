import mongoose from "mongoose";
import auditLoggerPlugin from "../utils/AuditLoggerPlugin.js";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    iconUrl: String,
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    popularity: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

CategorySchema.index({ name: 1 });
CategorySchema.index({ parentCategory: 1 });

CategorySchema.plugin(auditLoggerPlugin, { entityType: "category" });

const Category = mongoose.model("Category", CategorySchema);
export default Category;
