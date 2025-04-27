import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
  getEventsByCategory,
  getNearbyEvents,
  getPublishedEvents,
  getVersionHistory,
} from "../controllers/event.controller.js";
import eventRolesRoutes from "./eventRole.routes.js";
import rsvpRoutes from "./rsvp.routes.js";
import sessionRoutes from "./session.routes.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRole from "../middlewares/authorizeRole.middleware.js";
import { setUserContext } from "../config/context.js";

const router = Router({ mergeParams: true });

router.get("/", authMiddleware, setUserContext, getAllEvents);
router.post("/", authMiddleware, setUserContext, createEvent);
router.get("/published", authMiddleware, setUserContext, getPublishedEvents);
router.get("/upcoming", authMiddleware, setUserContext, getUpcomingEvents);
router.get("/nearby", authMiddleware, setUserContext, getNearbyEvents);
router.get(
  "/category/:categoryId",
  authMiddleware,
  setUserContext,
  getEventsByCategory
);
router.get("/:id", authMiddleware, setUserContext, getEventById);
router.patch(
  "/:id",
  authMiddleware,
  setUserContext,
  authorizeRole("organizer"),
  updateEvent
);
router.delete(
  "/:id",
  authMiddleware,
  setUserContext,
  authorizeRole("organizer"),
  deleteEvent
);
router.get(
  "/:id/history",
  authMiddleware,
  setUserContext,
  authorizeRole("organizer"),
  getVersionHistory
);

router.use("/:eventId/roles", eventRolesRoutes);
router.use("/:eventId/rsvp", rsvpRoutes);
router.use("/:eventId/session", sessionRoutes);

export default router;
