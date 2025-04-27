import { Router } from "express";
import {
  getRSVPByUserEvent,
  getRSVPByEvent,
  createRSVP,
  updateCheckInTime,
  updateRSVPStatus,
} from "../controllers/rsvp.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { setUserContext } from "../config/context.js";

const router = Router({ mergeParams: true });

router.get("/", authMiddleware, setUserContext, getRSVPByEvent);
router.get("/user", authMiddleware, setUserContext, getRSVPByUserEvent);
router.post("/", authMiddleware, setUserContext, createRSVP);
router.patch(
  "/:rsvpId/check-in",
  authMiddleware,
  setUserContext,
  updateCheckInTime
);
router.put("/:rsvpId/status", authMiddleware, setUserContext, updateRSVPStatus);

export default router;
