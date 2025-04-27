import { Router } from "express";
import {
  createFeedback,
  getEventFeedback,
  getUserFeedback,
  updateFeedback,
  markFeedbackHelpful,
} from "../controllers/feedback.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { setUserContext } from "../config/context.js";

const router = Router({ mergeParams: true });

router.post("/", authMiddleware, setUserContext, createFeedback);
router.get("/event/:eventId", authMiddleware, setUserContext, getEventFeedback);
router.get("/user", authMiddleware, setUserContext, getUserFeedback);
router.put("/:id", authMiddleware, setUserContext, updateFeedback);
router.post(
  "/:id/helpful",
  authMiddleware,
  setUserContext,
  markFeedbackHelpful
);

export default router;
