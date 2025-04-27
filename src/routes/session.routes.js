import { Router } from "express";
import {
  createSession,
  updateSession,
  deleteSession,
} from "../controllers/session.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRole from "../middlewares/authorizeRole.middleware.js";
import { setUserContext } from "../config/context.js";

const router = Router({ mergeParams: true });

router.post(
  "/",
  authMiddleware,
  setUserContext,
  authorizeRole("organizer"),
  createSession
);
router.put(
  "/:sessionId",
  authMiddleware,
  setUserContext,
  authorizeRole("organizer"),
  updateSession
);
router.delete(
  "/:sessionId",
  authMiddleware,
  setUserContext,
  authorizeRole("organizer"),
  deleteSession
);

export default router;
