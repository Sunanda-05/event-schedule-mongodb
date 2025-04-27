import { Router } from "express";
import {
  createNotification,
  getUserNotifications,
} from "../controllers/notification.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { setUserContext } from "../config/context.js";

const router = Router({ mergeParams: true });

router.post("/", authMiddleware, setUserContext, createNotification);
router.get("/user", authMiddleware, setUserContext, getUserNotifications);

export default router;
