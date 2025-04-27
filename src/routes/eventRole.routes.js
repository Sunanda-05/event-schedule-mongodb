import { Router } from "express";
import {
  createEventRole,
  getRolesByEvent,
  deleteEventRole,
} from "../controllers/eventRole.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRole from "../middlewares/authorizeRole.middleware.js";
import { setUserContext } from "../config/context.js";

const router = Router({ mergeParams: true });

router.post(
  "/",
  authMiddleware,
  setUserContext,
  authorizeRole("organizer"),
  createEventRole
);
router.get("/", authMiddleware, setUserContext, getRolesByEvent);
router.delete("/:id", authMiddleware, setUserContext, deleteEventRole);

export default router;
