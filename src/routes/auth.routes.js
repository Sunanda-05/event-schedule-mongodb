import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshTokens,
  registerUser,
} from "../controllers/auth.controller.js";
import { setUserContext } from "../config/context.js";
const router = Router({ mergeParams: true });

router.post("/register", setUserContext, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshTokens);

export default router;
