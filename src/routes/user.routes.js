import { Router } from "express";
import {
  getUserProfile,
  getRolesByUser,
  getRSVPByUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { setUserContext } from "../config/context.js";

const router = Router({ mergeParams: true });

router.get("/", authMiddleware, setUserContext, getUserProfile);
router.get("/roles", authMiddleware, setUserContext, getRolesByUser);
router.get("/rsvp", authMiddleware, setUserContext, getRSVPByUser);

export default router;
