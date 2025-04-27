import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { setUserContext } from "../config/context.js";

const router = Router({ mergeParams: true });

router.get("/", authMiddleware, setUserContext, getCategories);
router.post("/", authMiddleware, setUserContext, createCategory);
router.patch("/:id", authMiddleware, setUserContext, updateCategory);
router.delete("/:id", authMiddleware, setUserContext, deleteCategory);

export default router;
