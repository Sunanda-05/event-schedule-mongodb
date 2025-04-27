import { Router } from "express";
import {
  getWaitlistByUserEvent,
  getWaitlistByUser,
  getWaitlistByEvent,
} from "../controllers/waitlist.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { setUserContext } from "../config/context.js";

const router = Router({ mergeParams: true });

router.get("/user", authMiddleware, setUserContext, getWaitlistByUser);
router.get(
  "/event/:eventId",
  authMiddleware,
  setUserContext,
  getWaitlistByEvent
);
router.get(
  "/event/:eventId/user",
  authMiddleware,
  setUserContext,
  getWaitlistByUserEvent
);

export default router;
