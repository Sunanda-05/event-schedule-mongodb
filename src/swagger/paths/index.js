import { authPaths } from "./auth.paths.js";
import { userPaths } from "./user.paths.js";
import { categoryPaths } from "./category.paths.js";
import { eventPaths } from "./event.paths.js";
import { eventRolePaths } from "./eventRole.paths.js";
import { rsvpPaths } from "./rsvp.paths.js";
import { sessionPaths } from "./session.paths.js";
import { feedbackPaths } from "./feedback.paths.js";
import { notificationPaths } from "./notification.paths.js";
import { waitlistPaths } from "./waitlist.paths.js";

export const paths = {
  ...authPaths,
  ...userPaths,
  ...categoryPaths,
  ...eventPaths,
  ...eventRolePaths,
  ...rsvpPaths,
  ...sessionPaths,
  ...feedbackPaths,
  ...notificationPaths,
  ...waitlistPaths,
};
